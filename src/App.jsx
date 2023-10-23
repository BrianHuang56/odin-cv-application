import './App.css'
import Resume from "./components/Resume";
import ResumeEditor from "./components/ResumeEditor";
import ResumeEditorModes from "./components/ResumeEditorModes";
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';

var copyHeader;
function App() {
  const defHeader = {"name": "Your Name", "phone": "111-222-3333", "email": "placeholder@email.com", "location": "Some, Place"};
  const education = [{"datestart": "August 2019", "dateend": "May 2023", "name": "University of Maryland, College Park", 
                     "title": "Bachelors in Computer Science", "location": "College Park, Maryland", "key": uuidv4()}];
  const we = [{"datestart": "June 2023", "dateend": "Present", "name": "Company LLC", "title": "Job Title", "location": "Some, Place",
               "key": uuidv4(), "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}];
  const defBody = [{"list": education, "title": "Education", "key": uuidv4()}, {"list": we, "title": "Work Experience", "key": uuidv4()}];

  const [header, setHeader] = useState(defHeader);
  const [body, setBody] = useState(defBody);
  const [prevBody, setPrevBody] = useState(JSON.parse(JSON.stringify(defBody)));
  const [editType, setEditType] = useState(0);

  function changeHeader(key, newVal) {
    if (copyHeader === undefined) copyHeader = JSON.parse(JSON.stringify(header));
    setHeader(header => ({... header, [key]: newVal}));
  }

  function revertHeader() {
    if (copyHeader !== undefined) setHeader(copyHeader);
    copyHeader = undefined;
  }

  function saveHeader() {
    copyHeader = undefined;
  }

  function revertBody() {
    setBody(JSON.parse(JSON.stringify(prevBody)));
  }

  function deleteMap(secTitle, id) {
    for (var i = 0;i < body.length;i++) {
      if (secTitle === body[i].title) {
        var list = body[i].list;
        for (var l = 0;l < list.length;l++) {
          if (list[l].key === id) {
            let newBody = [...body];
            let listChange = [...list];
            listChange.splice(l, 1);
            newBody[i].list = listChange;
            setBody(newBody);
            setPrevBody(JSON.parse(JSON.stringify(newBody)));
          }
        }
      }
    }
  }

  function deleteSection(secTitle) {
    for (var i = 0;i < body.length;i++) {
      if (body[i].title === secTitle) {
        let newBody = [...body];
        newBody.splice(i, 1);
        setBody(newBody);
        setPrevBody(JSON.parse(JSON.stringify(newBody)));
      }
    }
  }

  function insertSection(origSec, insertSec) {
    let newBody = [...body];
    newBody.splice(Math.max(insertSec - 1, 0), 0, newBody.splice(origSec, 1)[0]);
    setBody(newBody);
    setPrevBody(JSON.parse(JSON.stringify(newBody)));
  }

  function saveBody(secTitle, id) {
    if (id === "temp") {
      for (var i = 0;i < body.length;i++) {
        if (secTitle === body[i].title) {
          var list = body[i].list;
          for (var l = 0;l < list.length;l++) {
            if (list[l].key === id) {
              let newBody = [...body];
              let listChange = {...list[l]};
              listChange.key = uuidv4();
              newBody[i].list[l] = listChange;
              setBody(newBody);
              setPrevBody(JSON.parse(JSON.stringify(newBody)));
            }
          }
        }
      }
    }
    else setPrevBody(JSON.parse(JSON.stringify(body)));
  }

  function changeBody(key, newVal, secTitle, id) {
    for (var i = 0;i < body.length;i++) {
      if (secTitle === body[i].title) {
        var list = body[i].list;
        for (var l = 0;l < list.length;l++) {
          if (list[l].key === id) {
            let newBody = [...body];
            let listChange = {...list[l]};
            listChange[key] = newVal;
            newBody[i].list[l] = listChange;
            setBody(newBody);
            return;
          }
        }
        var newMap = {"datestart": "", "dateend": "", "name": "", "title": "", "location": "", "key": "temp"};
        newMap[key] = newVal;
        let listChange = body[i].list;
        listChange.push(newMap);
        let newBody = [...body];
        newBody[i].list = listChange;
        setBody(newBody);
      }
    }
  }

  function checkDupTitle(title) {
    for (var i = 0;i < body.length;i++) {
      if (body[i].title === title) return true;
    }
    return false;
  }

  function addSection(title) {
    if (checkDupTitle(title)) return;
    var newMap = {"list": [], "title": title, "key": uuidv4()};
    let newBody = [...body];
    newBody.push(newMap);
    setBody(newBody);
    setPrevBody(JSON.parse(JSON.stringify(newBody))); 
  }

  function changeSectionTitle(ind, newTitle) {
    if (checkDupTitle(newTitle)) return false;
    let newBody = [...body];
    newBody[ind].title = newTitle;
    setBody(newBody);
    setPrevBody(JSON.parse(JSON.stringify(newBody)));
  }

  return (
    <>
      <ResumeEditorModes editType={editType} setEditType={setEditType} />
      <ResumeEditor header={header} body={prevBody} editType={editType} changeSectionTitle={changeSectionTitle} insertSection={insertSection} addSection={addSection} delSection={deleteSection} onChangeHeader={changeHeader} revertHeader={revertHeader} saveHeader={saveHeader} onChangeBody={changeBody} revertBody={revertBody} saveBody={saveBody} deleteMap={deleteMap}/>
      <Resume header={header} body={body} />
    </>
  )
}

export default App
