import * as React from "react";

import Header from "../components/mainList/header/header";
import SideButtons from "../components/mainList/asideButtons/asideButtons";
import ImgListBranch from "../components/mainList/imageList/ImgListBranch";
import Footer from "../components/mainList/footer/footer";

import { MainContainer } from "../style/container";
const { Container } = MainContainer;

const MainPage = () =>{
    return(
        <Container>
            <Header />
            <SideButtons />
            <ImgListBranch />
            <Footer />
        </Container>
    )
}

export default MainPage;