import * as React from "react";

import Header from "../components/mainList/header/header";
import SideButtons from "../components/mainList/asideButtons/asideButtons";
import ImageList from "../components/mainList/imageList/imageList";
import Footer from "../components/mainList/footer/footer";

import { MainContainer } from "../style/container";
const { Container } = MainContainer;

const MainPage = () =>{
    return(
        <Container>
            <Header />
            <SideButtons />
            <ImageList />
            <Footer />
        </Container>
    )
}

export default MainPage;