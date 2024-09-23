// 1: 페이지 만들기 / 2: App.js에서 Route추가 / constants->basicMenu에서 하나 추가 / 여기 코드 다 짜기 / 백엔드로 가기

import axios from 'axios';
import React, { useState } from 'react';


// 2 : 기능추가
function RegisterColorPage(props) {

    // (1) : 상태가 있어야 인풋체인지가능하니까
const [color, setColor] = useState ({
    colorName: "",
});

// (2)
const handleInputChange = (e) => {

    setColor(color => {

        return {
            ...color,
            [e.target.name]: e.target.value
        }
    });
}

// (3) : 연결하는 걸 마지막으로 하고 백엔드로 가기
const handleSubmitClick = async () => {

    // axios : 넘겨줄건데 post요청으로 저 주소에 color 객체 넘겨줄 거임 => 백엔드에 저 주소 가지고 있는 postMapping있어야 함 
    try {
        const response = await axios.post("http://localhost:8080/api/v1/color", color); 

    } catch(error) {
        console.error(error);
    }

    setColor(color => {

        return {
            colorName: ""
        }
    });
}

// 1 : 화면 띄우기 
    return (
        <div>
            <h1>색상 등록 페이지</h1>
            <p>
                <label htmlFor="">색상 이름</label>
                <input type="text" 
                name="colorName" id="" 
                onChange={handleInputChange}
                value={color.colorName}
                />
            </p>
            <button onClick={handleSubmitClick}>등록</button>
        </div>
    );
}

export default RegisterColorPage;