// tạo mảng global

let unCheckList = [];
let checkedList = [];

// tạo object list
// class List {
//   constructor(id, listName) {
//     this.id = id;
//     this.listName = listName;
//   }
// }

// hàm helper
function dom(selector) {
  return document.querySelector(selector);
}

// hàm reset input
function reset(){
    dom("#newTask").value = ""
}

// hàm display việc cần làm
function display(objectList) {
  // duyệt mảng
  let html = objectList.reduce((result, list) => {
    return (
      result +
      `
        <li>
        <div>
        <span>${list}</span>
        </div>
        <div class="buttons">
        <button class=" complete" ><i class="fa-regular fa-circle-check" data-name='${list}' data-type="checked"></i></button>
        <button class="remove" ><i class="fa-regular fa-trash-can" data-name='${list}' data-type="deleted"></i></button>
        </div>
        
        </li>
        
        `
    );
  }, "");

  return html;
}

// bắt sự kiện click thêm todo list
dom("#addItem").addEventListener("click", () => {
  // dom lấy value ô input
  let todoList = dom("#newTask").value;
  if(todoList === "") return

  // push nội dung todolist vào mảng global lists
  unCheckList.push(todoList);

  //reset lại ô input
  reset()

  // in ra html
  dom("#todo").innerHTML = display(unCheckList);
});

// hàm delete listtodo
function xoa(listName) {
  // dùng hàm filter để xóa và gán lại cho chính hàm unCheckList
  unCheckList = unCheckList.filter((list) => {
    return list !== listName;
  });
  //     // in ra html
  dom("#todo").innerHTML = display(unCheckList);

  
}

// hàm xóa checked list
function deleteChecked(listName) {
  checkedList = checkedList.filter((list) => {
    return listName !== list;
  });

  console.log(checkedList);

  // in ra html ở phần completed
  dom("#completed").innerHTML = display(checkedList);
}

// hàm checked
function checked(listName) {
  unCheckList.forEach((list) => {
    if (listName === list) {
      checkedList.push(list);
    }
  });

  xoa(listName);

  // in ra html ở phần completed
  dom("#completed").innerHTML = display(checkedList);
}

// bắt sự kiện click ở thẻ cha todo
dom("#todo").addEventListener("click", (evt) => {
  let elVal = evt.target.getAttribute("data-type");
  let listName = evt.target.getAttribute("data-name");

  console.log(elVal);
  if (elVal === "deleted") {
    xoa(listName);
  } else if (elVal === "checked") {
    checked(listName);
  }
});

// bắt sự kiện click ở thẻ cha completed
dom("#completed").addEventListener("click", (evt) => {
  let elVal = evt.target.getAttribute("data-type");
  let listName = evt.target.getAttribute("data-name");

  console.log(elVal);
  if (elVal === "deleted") {
    deleteChecked(listName);
  }
});

// hàm sắp xếp a-Z
dom("#two").addEventListener("click",(evt)=>{   
    // dùng hàm .sort để sắp xếp mảng
    // sắp xếp mảng todo
   unCheckList =  unCheckList.sort()

    //     // in ra html
  dom("#todo").innerHTML = display(unCheckList);

  //==== sắp xếp cho mảng checkedList
  checkedList =  checkedList.sort()

    //     // in ra html
  dom("#completed").innerHTML = display(checkedList);
})

// hàm sắp xếp Z - A
dom("#three").addEventListener("click",(evt)=>{   
    // dùng hàm .sort để sắp xếp mảng
    // sắp xếp mảng todo
   unCheckList =  unCheckList.sort()
   // dùng hàm reverse để đảo ngược lại sắp xếp
   unCheckList = unCheckList.reverse()

    //     // in ra html
  dom("#todo").innerHTML = display(unCheckList);

  //==== sắp xếp cho mảng checkedList
  checkedList =  checkedList.sort()
  // dùng hàm reverse để đảo ngược lại sắp xếp
  checkedList = checkedList.reverse()

    //     // in ra html
  dom("#completed").innerHTML = display(checkedList);
})