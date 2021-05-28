import React from 'react';
import logo from './logo.png';

function Start ({name}) {
    const styles = {
        wrap:{
            display:"flex",
            margin:"16px"
        },
        innerWrap:{
            width:"400px",
            height:"200px",
            margin:"auto",
            display:"flex",
            flexDirection:"column"
        },
        img:{
            alignSelf:"center",
            margin:"16px",
        },
        desc:{
            textAlign:"center",
            // backgroundColor:"#eee"
        },
        name:{
            borderRadius:"30px",
            backgroundColor:"#fef5d4",
            padding:"5px 10px"
        },
        inputName:{
            borderRadius:"30px",
            border:"2px solid #dadafc",
            padding:"10px 10px 8px 10px",
        },
        btnName:{
            width:"100px",
            alignSelf:"center",
            marginTop:"25px",
            backgroundColor:"#dadafc",
            border:"0px",
            borderRadius:"30px",
            padding:"8px 5px"
        }
    }

    return(
        <div className="wrap" style={styles.wrap}>
            <div className="innerWrap" style={styles.innerWrap}>
                <img className="img" src={logo} style={styles.img}></img>
                <h1 className="desc" style={styles.desc}>나는 <span className="name" style={styles.name}>{name}</span> 에 대해
                 얼마나 알고 있을까?</h1>
                <input type="text" placeholder="내 이름" style={styles.inputName}></input>
                <button style={styles.btnName}>시작하기</button>
            </div>
        </div>
    )

}
export default Start