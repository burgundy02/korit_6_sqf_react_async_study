import React from 'react';
/** @jsxImportSource @emotion/react */      // ej
import * as s from "./style";              

function MainLayout({children}) {           // rsf
    return (
        <div css={s.layout}>
            {children}
        </div>
    );
}

export default MainLayout;