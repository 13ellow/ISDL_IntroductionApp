// App.js
import React, { useState, useEffect, useCallback } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import "./style/App.css";
import SlideShow from "./SlideShow";
import AboutPic from "./AboutPic";

const images = [
  process.env.PUBLIC_URL + "/photos/23年度集合写真.jpg",
  process.env.PUBLIC_URL + "/photos/D-Day.jpg",
  process.env.PUBLIC_URL + "/photos/4月月例発表会.jpg",
  process.env.PUBLIC_URL + "/photos/5月月例発表会.jpg",
  process.env.PUBLIC_URL + "/photos/6月月例発表会.jpg",
  process.env.PUBLIC_URL + "/photos/小野先生への誕生日プレゼント贈呈.jpg",
  process.env.PUBLIC_URL + "/photos/大掃除.jpg",
  process.env.PUBLIC_URL + "/photos/7月月例発表会.jpg",
  process.env.PUBLIC_URL + "/photos/懇親会①.jpg",
  process.env.PUBLIC_URL + "/photos/懇親会②.jpg",
  process.env.PUBLIC_URL + "/photos/8月月例発表会.jpg",
  process.env.PUBLIC_URL + "/photos/ISDLハッカソン.jpg",
  process.env.PUBLIC_URL + "/photos/情報工学応用論①.jpg",
  process.env.PUBLIC_URL + "/photos/情報工学応用論②.jpg",
  process.env.PUBLIC_URL + "/photos/OB会.jpg",
  process.env.PUBLIC_URL + "/photos/交流会.jpg",
  process.env.PUBLIC_URL + "/photos/忘年会.jpg",
  process.env.PUBLIC_URL + "/photos/卒業式.jpg",
];

function App() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [imageFileName, setImageFileName] = useState("");
  const [slideshowPlaying, setSlideshowPlaying] = useState(true);

  useEffect(() => {
    // 画像ファイル名からテキストファイル名を生成
    const imageFile = images[index];
    const textTempName = imageFile.split("/").pop();
    const textFileName = textTempName.replace(/\.[^.]+$/, ".txt");
    const title = textFileName.split(".")[0];

    console.log(textFileName);

    // テキストファイルを読み込む非同期関数
    async function fetchText() {
      try {
        const response = await fetch(
          process.env.PUBLIC_URL + "/details/" + textFileName
        );
        if (response.ok) {
          const textContent = await response.text();
          setText(textContent);
        } else {
          console.error("Failed to fetch text file");
        }
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    }

    fetchText();
    setImageFileName(title);
  }, [index]);

  const handleTabClick = useCallback(
    (num) => {
      setTabIndex(num);

      if (num === 1) {
        setSlideshowPlaying(false);
      } else {
        setSlideshowPlaying(true);
      }
    },
    [setTabIndex, setSlideshowPlaying]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        e.preventDefault();

        if (slideshowPlaying) {
          handleTabClick(1);
        } else {
          handleTabClick(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slideshowPlaying, handleTabClick]);

  return (
    <div className="container">
      <Tabs
        align="end"
        index={tabIndex}
        variant="soft-rounded"
        colorScheme="green"
      >
        <TabList align="end" className="tablist">
          <Tab>Home</Tab>
          <Tab>About</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="slideshow">
              <SlideShow
                images={images}
                index={index}
                setIndex={setIndex}
                playing={slideshowPlaying}
              ></SlideShow>
            </div>

            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => handleTabClick(1)}
              className="toAbout"
            >
              {imageFileName}
            </Button>
          </TabPanel>

          <TabPanel>
            <div className="detail">
              <AboutPic
                image={images[index]}
                text={text}
                title={imageFileName}
              ></AboutPic>
            </div>

            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => handleTabClick(0)}
            >
              Back to Home
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
