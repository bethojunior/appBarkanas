
class Preloader{

    static showPreload(idDiv){
        document.getElementById("preloadPadrao").style.display = "block";
        document.getElementById(idDiv).style.display = "none";
    }

    static hiddenPreload(idDiv){
        document.getElementById("preloadPadrao").style.display = "none";
        document.getElementById(idDiv).style.display = "block";
    }
    
}