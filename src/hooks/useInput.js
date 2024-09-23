import React, { useState } from 'react';

// use로시작 : hook
function useInput() {
    const [ value, setValue ] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    }
    return { value, setValue, onChange };
}

export default useInput;