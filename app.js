const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname+"/views/partials");   //PARTİALSLER REGİSTER EDİLDİ.

app.set("view engine","hbs");  //View engine ayarladı


app.use((req,res,next) => {                  //MİDDLEWARE KULLANILARAK LOG TUTTUK.
    var now = new Date().toString();
    var log = now+": "+req.method+" "+req.url;
    console.log(log);
    fs.appendFile("server.log",log+"\n",(err) => { 
        if(err){
            console.log("Unable to append to the file.");
        }
    });
    next();
});

//app.use((req,res,next) => {            //NEXT FONKSİYONU ÇAĞRILMADIĞI İÇİN TÜM SAYFALAR BURAYA AÇILACAK,BAKIM SAYFASI GİBİ BİR ŞEY
//   res.render("maintenance.hbs");
//});


app.use(express.static(__dirname+"/public"));  // serverda help.html yazarsak publicin altındaki html dosyası kullanılıyor.


hbs.registerHelper("getCurrentYear",() => {    // önce Anahtar belirtiliyor,sonra callback fonksiyonuyla return ediliyor.
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text) => {    //REGİSTER OLUŞTURUP BUNUN ÜZERİNDEN ANAHTARI HBS LERDE ANAHTARI ÇAĞIRIP İŞLEMLERİ GERÇEKLEŞTİREBİLİYORUZ.
    return text.toUpperCase();
})

app.get("/",(req,res) => {              // home.hbs yi / gördüğünde renderla ve bazı bilgileri yolla.
    res.render("home.hbs",{
        pageTitle:"Home page",
        paragraph:"This is a home page",
        title:"Home page",
        welcomeMessage:"Welcome to my home page"
    });
});

app.get("/about",(req,res) => {  // about.hbs yi /about gördüğünde renderla ve bilgileri yola.
    res.render("about.hbs",{
        pageTitle:"About Page",
        paragraph:"This is a about page",
        title:"About page"
    });
});

app.get("/404",(req,res) => {
    res.send("404 NOT FOUND!");
});

app.listen(3000,() => {         // Serverimiz 3000 portunda çalışıyor.
    console.log("Server is running on port 3000!")
});