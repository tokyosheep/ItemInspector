import styled from "styled-components";

export const MainContainer = {
    Container:styled.div`
        display: grid;
        grid-template-rows: 70px 50px minmax(300px,400px) 30px;
        grid-template-columns: minmax(300px , 1fr);
        grid-template-areas: 
            "header"
            "asideButtons"
            "ImageList"
            "footer"
        ;
        position: relative;
    `,
    HeaderCompo:styled.header`
        grid-area: header;
    `,
    SideButtonsCompo:styled.aside`
        grid-area: asideButtons;
    `,
    ImageListCompo:styled.main`
        grid-area:ImageList;
        position: relative;
        overflow: scroll;
    `,
    FooterCompo:styled.footer`
        grid-area: footer;
        background: #111;
    `
}