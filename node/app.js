const express = require('express');
const app = express();
const session = require('express-session');
const fs = require("fs");


const mysql = require('mysql');
const db = {
    connectionLimit: 10,
    host: '192.168.174.1',
    port: '3308',
    user: 'dev',
    password: '1111',
    database: 'dev'
}
const dbPool = mysql.createPool(db);




app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 //쿠기 유효시간 1시간
    }
}));
/*
Expressjs에서 JSON Request Body 파싱하기
expressjs에서 웹 서비스를 제작 했을때, json으로 이루어진 Request Body를 받았을 경우, 요청값을 제대로 받아오지 못하는 문제가 발생한다.
expressjs에서는 이러한 문제를 해결하는 방법으로 크게 2가지 방법을 사용할 수 있다.
body-parser 모듈 사용(4.16 이전 버전).
express.json() 사용
*/
//express 4.16  이전 버전
//app.use(bodyParser);
//express  4.16 이후 버전
app.use(express.json({
    limit: '50mb'
}));


app.use(session({
    secret: 'secret code',  //세션에 대한 키값
    resave: false,  //request 요청이 왔을때 session 수정사항을 다시 저장할 것인지
    saveUninitialized: false, // session 저장 내역이 없더라도 다시 저장할 것인지
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 //쿠키 유효시간 1시간
    }
}));




const server = app.listen(3000, () => {
    console.log('Server started. port 3000. ');
});



//sql 변경시 재시작없이 반영되도록 
let sql = require('./sql.js');
const { rejects } = require('assert');

fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
    console.log('sql 변경시 재시작없이 반영되도록 함');
    delete require.cache[require.resolve('./sql.js')];
    sql = require('./sql.js');
});


app.post('/api/login', async (request, res) => {
    //request.session['email'] = "braverokmc79@gmail.com";
    //res.send("ok");

    try {
        console.log("signUp");
        await req.db('signUp', request.body.param);
        //세션 넣기
        if (request.body.param.length > 0) {
            for (let key in request.body.param[0]) {
                console.log(" request.body.param[0][key] 키 값은 :");
                console.log(request.body.param[0][key]);

                request.session[key] = request.body.param[0][key];
            }
            res.send(request.body.param[0]);
        } else {
            res.send({ error: "please try again or contact system manager." });
        }
    } catch (error) {
        res.send({
            error: "DB Access error"
        })
    }



});

app.post('/api/logout', async (request, res) => {
    request.session.destroy();
    res.send("ok");
});



app.get('/api/:alias', async (request, res) => {
    try {
        console.log("alias  : " + request.params.alias);
        console.log("바디 param 값 : ");
        console.log(request.body.param);

        res.send(await req.db(request.params.alias, request.body.param));

        // console.log(request);
        //console.log("body.param  : " + request.body.param);
        //console.log("body.where  : " + request.body.where);
        //res.send(await req.db(request.params.alias, request.body.param, request.body.where));
    } catch (err) {
        console.log("err : " + err);
        res.status(500).send({
            error: err
        });
    }
});


app.post('/api/:alias', async (request, res) => {

    if (!request.session.email) {
        //   return res.status(401).send({ error: "Youn need to login." });
    }

    try {
        console.log("alias  : " + request.params.alias);
        console.log("바디 param 값 : ");
        console.log(request.body.param);

        /*
            다음과 같은 형식으로 데이터를 넘겨준다
            {"param":["1"]}
        */

        res.send(await req.db(request.params.alias, request.body.param));

        // console.log(request);
        //console.log("body.param  : " + request.body.param);
        //console.log("body.where  : " + request.body.where);
        //res.send(await req.db(request.params.alias, request.body.param, request.body.where));
    } catch (err) {
        console.log("err : " + err);
        res.status(500).send({
            error: err
        });
    }

});


app.post('/upload/:productId/:type/:fileName', async (request, res) => {

    let {
        productId,
        type,
        fileName
    } = request.params;
    const dir = `${__dirname}/uploads/${productId}`;
    const file = `${dir}/${fileName}`;
    if (!request.body.data) return fs.unlink(file, async (err) => res.send({
        err
    }));
    const data = request.body.data.slice(request.body.data.indexOf(';base64,') + 8);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFile(file, data, 'base64', async (error) => {
        await req.db('productImageInsert', [{
            product_id: productId,
            type: type,
            path: fileName
        }]);

        if (error) {
            res.send({
                error
            });
        } else {
            res.send("ok");
        }
    });
});

app.get('/download/:productId/:fileName', (request, res) => {
    const {
        productId,
        type,
        fileName
    } = request.params;
    const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
    res.header('Content-Type', `image/${fileName.substring(fileName.lastIndexOf("."))}`);
    if (!fs.existsSync(filepath)) res.send(404, {
        error: 'Can not found file.'
    });
    else fs.createReadStream(filepath).pipe(res);
});




const req = {
    async db(alias, param = [], where = '') {
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
            if (error) {
                if (error.code != 'ER_DUP_ENTRY')
                    console.log(error);
                resolve({
                    error
                });
            } else resolve(rows);
        }));
    }
};






