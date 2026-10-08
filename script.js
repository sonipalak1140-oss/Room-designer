
let room=document.getElementById("room");
let selectedFurniture=null;
let selectedObject=null;
let offsetX=0;
let offsetY=0;

function addFurniture(type){
    let furniture=document.createElement("div");

    furniture.className="furniture";
    furniture.style.left="100px";
    furniture.style.top="150px";

    let content=document.createElement("div");
    content.className="item-content";

    if(type=="sofa"){
        content.innerHTML=`<svg viewBox="0 0 220 130" class="furniture-image">
        <rect x="25" y="45" width="170" height="65" rx="18" fill="#9b6b52"/>
        <rect x="35" y="25" width="150" height="55" rx="18" fill="#b98568"/>
        <rect x="15" y="55" width="35" height="60" rx="15" fill="#87583f"/>
        <rect x="170" y="55" width="35" height="60" rx="15" fill="#87583f"/>
        <rect x="40" y="82" width="140" height="12" rx="5" fill="#704733"/>
        <rect x="45" y="105" width="12" height="18" fill="#543628"/>
        <rect x="165" y="105" width="12" height="18" fill="#543628"/></svg>`;

    }else if(type=="bed"){
        content.innerHTML=`<svg viewBox="0 0 220 150" class="furniture-image">
        <rect x="20" y="45" width="180" height="85" rx="10" fill="#8b6f61"/>
        <rect x="25" y="25" width="170" height="45" rx="10" fill="#6f5548"/>
        <rect x="40" y="55" width="65" height="35" rx="8" fill="#f0dfc8"/>
        <rect x="115" y="55" width="65" height="35" rx="8" fill="#f0dfc8"/>
        <rect x="25" y="90" width="170" height="40" fill="#c49a7a"/></svg>`;

    }else if(type=="chair"){
        content.innerHTML=`<svg viewBox="0 0 150 180" class="furniture-image">
        <rect x="35" y="30" width="80" height="90" rx="15" fill="#9b6b52"/>
        <rect x="25" y="100" width="100" height="45" rx="10" fill="#b98568"/>
        <rect x="35" y="140" width="12" height="35" fill="#543628"/>
        <rect x="103" y="140" width="12" height="35" fill="#543628"/></svg>`;

    }else if(type=="plant"){
        content.innerHTML=`<svg viewBox="0 0 130 180" class="furniture-image">
        <rect x="45" y="60" width="40" height="75" rx="5" fill="#4c8c50"/>
        <ellipse cx="65" cy="55" rx="28" ry="45" fill="#6fae63"/>
        <ellipse cx="38" cy="75" rx="20" ry="40" fill="#5f9d5c"/>
        <ellipse cx="92" cy="75" rx="20" ry="40" fill="#5f9d5c"/>
        <path d="M65 55 L65 125" stroke="#3f713e" stroke-width="5"/>
        <path d="M65 80 L40 60" stroke="#3f713e" stroke-width="4"/>
        <path d="M65 90 L90 65" stroke="#3f713e" stroke-width="4"/>
        <path d="M65 125 L40 150 L90 150 Z" fill="#b66c43"/></svg>`;

    }else if(type=="frame"){
    content.innerHTML=`<svg viewBox="0 0 220 160" class="furniture-image">
    <rect x="10" y="10" width="200" height="140" rx="5" fill="#6b4428"/>
    <rect x="22" y="22" width="176" height="116" fill="#ead7c0"/>
    <rect x="28" y="28" width="164" height="104" fill="#9dd5e8"/>
    <circle cx="155" cy="55" r="18" fill="#f5c542"/>
    <path d="M28 120 L80 70 L115 105 L145 75 L192 120 Z" fill="#6fae63"/>
    <path d="M28 105 L70 75 L100 100 L125 80 L192 110 L192 132 L28 132 Z" fill="#4c8c50"/></svg>`;
}
    furniture.appendChild(content);
    room.appendChild(furniture);
    selectObject(furniture);
    dragFurniture(furniture);
}

function selectObject(obj){
    selectedObject=obj;

    document.querySelectorAll(".furniture").forEach(function(item){
        item.classList.remove("selected");
    });

    obj.classList.add("selected");
}

function deleteObject(){
    if(selectedObject==null){
        alert("Please select an object first!");
        return;
    }
    selectedObject.remove();
    selectedObject=null;
}

function resizeObject(scale){
    if(selectedObject == null){
        alert("Please select an object first!");
        return;
    }
    let newWidth = selectedObject.offsetWidth*scale;
    let newHeight = selectedObject.offsetHeight*scale;
          if(newWidth < 50 || newHeight < 50){
            return;
          }

          if(newWidth > 500 || newHeight > 500){
              return;
           }

    selectedObject.style.width = newWidth+"px";
    selectedObject.style.height = newHeight+"px";
}

function dragFurniture(furniture){
    furniture.addEventListener("mousedown",function(e){
        e.preventDefault();
        selectObject(furniture);
        selectedFurniture=furniture;

        let furnitureBox=furniture.getBoundingClientRect();

        offsetX=e.clientX-furnitureBox.left;
        offsetY=e.clientY-furnitureBox.top;
    });

    document.addEventListener("mousemove",function(e){
        if(selectedFurniture!=furniture){
            return;
        }

        let roomBox=room.getBoundingClientRect();
        let x = e.clientX-roomBox.left-offsetX;
        let y = e.clientY-roomBox.top-offsetY;

        if(x < 0){
            x = 0;
        }
        if(y < 0){
            y = 0;
        }
        if(x > room.clientWidth - furniture.offsetWidth){
            x = room.clientWidth - furniture.offsetWidth;
        }
        if(y > room.clientHeight - furniture.offsetHeight){
            y = room.clientHeight - furniture.offsetHeight;
        }
        furniture.style.left = x + "px";
        furniture.style.top = y + "px";
    });
    document.addEventListener("mouseup",function(){
        selectedFurniture = null;
    });
}

function changeWall(){
    let color=document.getElementById("wallColor").value;
    document.getElementById("wall").style.background = color;
}

function changeFloor(){
    let color=document.getElementById("floorColor").value;
    document.getElementById("floor").style.background = color;
}

function saveRoom(){
    localStorage.setItem("room",room.innerHTML);
    localStorage.setItem("wall",document.getElementById("wallColor").value);
    localStorage.setItem("floor",document.getElementById("floorColor").value);
    alert("Room Saved! 💾");
}

function resetRoom(){
    localStorage.clear();
    location.reload();
}

let furniture=document.querySelectorAll(".furniture");
furniture.forEach(function(item){
    dragFurniture(item);
});

room.addEventListener("click",function(e){
    if(!e.target.closest(".furniture")){
        if(selectedObject){
            selectedObject.classList.remove("selected");
            selectedObject = null;
        }
    }
});