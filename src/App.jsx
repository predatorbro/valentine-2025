import { useEffect, useRef, useState } from "react";
import DualBtn from "./components/DualBtn";
import SingleBtn from "./components/SingleBtn";
import { Client, Databases, ID } from "appwrite";
// audio here
import yeah from "/yay.mp3";
// images here
import hello from "/hello.gif";
import one from "/123.gif";
import cute1 from "/cute.gif";
import love from "/love-ilu.gif";
import mochi from "/mochi.gif";
import noo from "/noo.gif";
import cute2 from "/cute-dancing.gif";

function App() {
  const [imageName, setImageName] = useState("hello");
  const [response, setResponse] = useState("");
  const [nextConfirm, setNextconfirm] = useState("");
  const [currstep, setStep] = useState(1);
  const [changeimage, setChangeimage] = useState(true);
  const [device, setDevice] = useState(true); //true = pc; false = mob
  const [user, setuser] = useState(false);

  const noPressed = () => {
    setResponse(false);
    if (currstep == 6) {
      setStep((state) => state - 1);
    } else {
      setStep((state) => state + 1);
    }
  };
  const yesPressed = () => {
    setResponse(true);
    setStep(7);
    const yay = new Audio(yeah); // Path to your MP3 file
    yay.play();
  };

  const singleClicked = () => {
    setNextconfirm(true);
  };
  let userName =
    localStorage.getItem("userName") &&
    localStorage.getItem("userName") != "null"
      ? localStorage.getItem("userName")
      : "";

  useEffect(() => {
    if (window.innerWidth > 600) {
      setDevice(true);
    } else {
      setDevice(false);
    }

    if (!userName) {
      userName = window.prompt("Enter your name 😺!!");
      localStorage.setItem("userName", userName);
      if (userName != "null" && userName != null) saveNameToDB();
    }

    if (userName) {
      setuser(true);
      // send server request
    }
  }, []);

  async function saveNameToDB() {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("6795b5e20012f6da2e99");

    const databases = new Databases(client);

    const promise = await databases.createDocument(
      "6795b5f800066731af13",
      "6795b60900127ebef344",
      ID.unique(),
      {
        name: userName,
      }
    );
    console.log(promise);
  }

  useEffect(() => {
    if (nextConfirm) {
      setStep((state) => state + 1);
      setNextconfirm(null);
    }
  }, [nextConfirm]);

  const images = ["", hello, one, cute1, love, mochi, noo, cute2];

  // timer is here
  // let timer = "";
  // useEffect(() => {
  //   setImageName(images[currstep] + ".gif");

  //   if (currstep == 7) {
  //     timer = setInterval(() => {
  //       setChangeimage((state) => !state);
  //     }, 3000);
  //   } else if (currstep == 4) {
  //     timer = setInterval(() => {
  //       setChangeimage((state) => !state);
  //     }, 3000);
  //   } else {
  //     clearInterval(timer);
  //     console.log("bhk")
  //   }
  // }, [currstep]);

  let timerRef = useRef(null);

  useEffect(() => {
    setImageName(images[currstep]);
    // Clear any existing interval before setting a new one
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (currstep === 4) {
      // Set a new interval if currstep matches the conditions
      timerRef.current = setInterval(() => {
        setChangeimage((state) => !state);
      }, 2000);
    } else {
      // Clear the interval for other conditions
      clearInterval(timerRef.current);
      timerRef.current = null; // Ensure timerRef is reset
    }
    // playing with 5th page
    if (device) {
      const yesbtn = document.querySelector("#YesBTN");
      const nobtn = document.querySelector("#NoBTN");

      const changeLocation = () => {
        yesbtn.style.top = `${yesbtn.offsetTop}px`;
        yesbtn.style.left = `${yesbtn.offsetLeft}px`;
        yesbtn.style.position = "fixed";

        const PosY = Math.floor(window.innerHeight * Math.random()) - 50;
        const PosX = Math.floor(window.innerWidth * Math.random()) - 50;

        nobtn.style.top = `${PosY}px`;
        nobtn.style.left = `${PosX}px`;
        nobtn.style.position = "fixed";
      };

      if (currstep == 6) {
        nobtn.addEventListener("mouseover", changeLocation);
      }
    }

    // Cleanup function to clear interval when component unmounts or currstep changes
    return () => {
      clearInterval(timerRef.current);
    };
  }, [currstep]);

  return (
    <>
      {user ? (
        <>
<div className="invisible h-0 w-0 fixed top-[-1000px]"> 
<img src={hello} />
<img src={one} />
<img src={cute1} />
<img src={love} />
<img src={mochi} />
<img src={noo} />
<img src={cute2} />
</div>

          {currstep == 1 && (
            <>
              <div
                className="h-screen  w-screen
       flex justify-center items-center flex-col
       gap-4 
       "
              >
                <img src={imageName} className="size-48" alt="" />
                <h1 className="text-center font-[Montserrat] font-semibold text-3xl ">
                  hii, there... 👀
                </h1>

                <SingleBtn
                  className={"  shadow-lg bg-gray-200"}
                  btnText={"Next 👉"}
                  onchange={singleClicked}
                />
              </div>
            </>
          )}
          {currstep == 2 && (
            <>
              <div
                className="h-screen  w-screen
       flex justify-center items-center flex-col
       gap-4 
       "
              >
                <img  src={imageName}  className="size-48" alt="" />
                <h1 className="mx-5 text-center font-[Montserrat] font-semibold text-3xl ">
                  i have something really important to tell youu... ❤️
                </h1>

                <SingleBtn
                  className={"  shadow-lg bg-gray-200"}
                  btnText={"Next 👉"}
                  onchange={singleClicked}
                />
              </div>
            </>
          )}
          {currstep == 3 && (
            <>
              <div
                className="h-screen  w-screen
       flex justify-center items-center flex-col
       gap-4 
       "
              >
                <img  src={imageName}  className="size-48" alt="" />
                <h1 className="text-center font-[Montserrat] font-semibold text-3xl ">
                  You are the cutest person i met this year... 😍
                </h1>

                <SingleBtn
                  className={"  shadow-lg bg-gray-200"}
                  btnText={"Next 👉"}
                  onchange={singleClicked}
                />
              </div>
            </>
          )}
          {currstep == 4 && (
            <>
              <div
                className="h-screen  w-screen
       flex justify-center items-center flex-col
       gap-4 
       "
              >
                {changeimage ? (
                  <img  src={imageName}  className="size-48" alt="" />
                ) : (
                  <img src={`/k.gif`} className="size-48" alt="" />
                )}
                <h1 className="text-center font-[Montserrat] font-semibold text-3xl ">
                  i like you sooooo much pookie, 😄
                  <br />
                  will you be my valentine?? 😘
                </h1>

                <DualBtn
                  onNo={noPressed}
                  onYes={yesPressed}
                  classes={" border-red-800  shadow-lg bg-gray-200"}
                  divClasses={" flex gap-25"}
                />
              </div>
            </>
          )}
          {currstep == 5 && !response && (
            <>
              <div
                className="h-screen  w-screen
       flex justify-center items-center flex-col
       gap-4 
       "
              >
                <img  src={imageName}  className="size-48" alt="" />
                <h1 className="text-center font-[Montserrat] font-semibold text-3xl ">
                  Nooo, pliss don’t say no... 😭 <br />
                  manjaoo na pliss..
                </h1>

                <DualBtn
                  onNo={noPressed}
                  onYes={yesPressed}
                  classes={" text-center border-red-800  shadow-lg bg-gray-200"}
                  divClasses={" flex gap-25"}
                />
              </div>
            </>
          )}
          {currstep == 6 && !response && (
            <>
              <div
                className="h-screen  w-screen
       flex justify-center items-center flex-col
       gap-4 
       "
              >
                <img  src={imageName}  className="size-48" alt="" />
                <h1 className="text-center font-[Montserrat] font-semibold text-3xl ">
                  yar! I’ll keep asking...
                  <br />
                  pliss pliss pliss.. 😭
                </h1>

                {device && <SingleBtn className={"invisible"} />}
                <DualBtn
                  idforyes={"YesBTN"}
                  idforno={"NoBTN"}
                  onNo={noPressed}
                  onYes={yesPressed}
                  classes={" border-red-800  shadow-lg bg-gray-200"}
                  divClasses={" flex gap-25"}
                />
              </div>
            </>
          )}
          {currstep == 7 && (
            <>
              <div
                className="h-screen  w-screen
       flex justify-center items-center flex-col
       gap-4 
       "
              >
                <img  src={imageName}  className="size-48" alt="" />
                <h1 className="text-center font-[Montserrat] font-semibold text-3xl ">
                  Yay! I knew it!! 😍
                  <br />
                  Love youu! poookiee ❤️
                </h1>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-center font-[Montserrat] font-semibold text-3xl ">
            Please, Enter your name to continue...
          </h1>
        </div>
      )}
    </>
  );
}

export default App;
