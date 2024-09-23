import React from 'react';

function PromisePage(props) {

    const loop = (name) => {
        // random 0 < 1 => 0.123455566
        const random = Math.floor(Math.random() * 100) + 1;
        for(let i = 0; i < random; i++) {
            console.log(`${name}: ${i}`);
        }
    }

    const testPromise = async () => {
            loop("test1");
            return "test1반복 완료";
        };
    

    const testPromise2 = () => {
        return new Promise((resolve, reject) => {
            loop("test2");
            resolve("test2반복 완료");
        });
    }

    const testPromise3 = () => {
        return new Promise((resolve, reject) => {
            loop("test3");
            resolve("test3반복 완료");
        });
    }

    const testPromise4 = (num) => {
        return new Promise((resolve, reject) => {
            console.log("test4");
            if(num === 0) {
                reject("test4오류!!!");
                return;
            }
            resolve("test4성공!!!");
        });
    }

    const testPromise5 = async (num) => {
            console.log("test5");
            if(num === 0) {
                throw new Error("test5오류!!!"); // 예외 터지면 밑에거 실행 안됨
            }
            return "test5성공!!!";
    }

    const handleClick1 = () => {
        // testPromise().then(r => console.log(r));        // testPromise()가 실행되고 then이 바로 실행되는게 아니라  
        // testPromise2().then(r => console.log(r));       // testPromise2(),3가 먼저 실행되고 나서 then들이 싱행됨
        // testPromise3().then(r => console.log(r));

        testPromise().then(r => {           // then: promise가 이행이 됐을 때 실행 됨  / then에서 resolve를 매개변수로 받음 
            console.log(r);
            testPromise3().then(r => {
                console.log(r);
                testPromise2().then(r => {
                    console.log(r);
                });
            });
        });        
    }

          // promise
    const handleClick2 = async () => {
       const r = await testPromise();    // await: 실행되고 나서 resolve의 값을 r에 넣는다. / promise문법을 간편하게 보기 쉽게 만들 때 사용
       console.log(r);                                                                    // async안에서만 사용가능, async쓴다는 건 promise 
       const r2 = await testPromise2();
       console.log(r2);
       const r3 = await testPromise3();
       console.log(r3);
    }

    // handleClick4처럼 콘솔에 뜨게 하려고 코드 이렇게 작성
    const handleClick3 = () => {
        testPromise4(0)
        .then(r => {
            console.log(r);
            testPromise5(0)
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.log(e);
        });
                
        }).catch(e => {
            console.error(e);
            testPromise5(0)
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.error(e);
            });
        })
    }
        

    const handleClick4 = async () => {

        try {
        const r = await testPromise4(1);        // await : promise가 갔다 올 떄까지 기다려라
            console.log(r);
        }catch(e) {
            console.error(e);
        }

        try {
            const r = await testPromise5(1);
            console.log(r);
        }catch(e) {
            console.error(e);
        }
 
    }

    return (
        <div>
            <button onClick={handleClick1}>버튼1</button>
            <button onClick={handleClick2}>버튼2</button>
            <button onClick={handleClick3}>버튼3</button>
            <button onClick={handleClick4}>버튼4</button>
        </div>
    );

}
export default PromisePage;