const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

getnotes().forEach((note) => {
    const noteEl = createnoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});

function createnoteEl(id , content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content ;

    element.addEventListener("dblclick",()=>{
        const warning = confirm ("Do you Want To Delete This Note ?");
        if(warning){
            deletenote(id , element);
        }
    });
    element.addEventListener("input",()=>{
        updatenote(id , element.value);
    });
    return element;
}

function deletenote(id , element){
    const notes = getnotes().filter((note) => note.id != id)
    savenote(notes);
    appEl.removeChild(element);
}
function updatenote(id , content) {
    const notes = getnotes();
    const target = notes.filter((note)=> note.id == id)[0];
    target.content = content;
    savenote(notes);
}

function addnote(){
    const notes = getnotes();
    const noteobj ={
        id:Math.floor(Math.random()*100000),
        content:"",
    };
    const noteEl = createnoteEl(noteobj.id , noteobj.content);
    appEl.insertBefore(noteEl, btnEl);
    notes.push(noteobj);
    savenote(notes)
}

function savenote(notes){
    localStorage.setItem("note-app",JSON.stringify(notes));
}
function getnotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}
btnEl.addEventListener("click",addnote);

