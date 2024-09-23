import axios from 'axios';
import React, { useState } from 'react';

function RegisterSizePage(props) {

// 사이즈를 쓰고나면 재렌더링 됨
const [size, setSize] = useState ({
    sizeName: "",
});

const handleInputChange = (e) => {

    setSize(size => {
       
       return {
            ...size,
            [e.target.name]: e.target.value
         }
    });
}

const handeSubmitClick = async () => {

    try {
        const response = await axios.post("http://localhost:8080/api/v1/size", size);

    } catch(error) {
        console.error(error);
    }
    

    // 등록했을 때 초기화
    setSize(size => {
       
        return {
            sizeName: "",
      }
     });
 }

    return (
        <div>
           <h1>사이즈 등록 페이지</h1> 
           <p>
            <label htmlFor="">사이즈이름</label>
            <input type="text" 
                name="sizeName" 
                onChange={handleInputChange}
                value={size.sizeName}
                // value={size.sizeName} : 우리가 입력한 값이 상태로 들어가고 -> 그걸 인풋창의 value로 설정했기 때문에 -> 인풋에 입력할 때 마다 입력한 값이 실시간으로 눈에 보이게 된다. *원리는 입력할 때 마다 set으로 재렌더링되면서 실시간으로 보여진다.
            />
           </p>
           <button onClick={handeSubmitClick}>등록</button>
        </div>
    );
}

export default RegisterSizePage;