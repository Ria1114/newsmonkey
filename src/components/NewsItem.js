import React from 'react'

const NewsItem =(props) => {

  
    let {title, description ,imageUrl , newsUrl, author,date,source} = props;
    return (
      <div>
          <div className="card  mx-3 my-5 " style={{minHeight:"408px"}}>
                <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}}>
                     <span  className=" badge rounded-pill bg-danger"> {source} </span>
                </div>
                <img src={!imageUrl ? "https://live-production.wcms.abc-cdn.net.au/4bed34bafb20cc3e5875f53a9f240edb?impolicy=wcms_crop_resize&cropH=1080&cropW=1920&xPos=0&yPos=0&width=862&height=485&imformat=generic": imageUrl} className="card-img-top" alt="..." style={{maxHeight:"200px" , minHeight:"199px"}}/>
                <div className="card-body">
                    <h5 className="card-title">{title}   </h5>
                    <p style={{fontFamily:"sans-serif Arial",fontSize: "0.8rem"}} className="card-text">{description}...</p>
                    <p  style={{fontFamily:"sans-serif Arial",fontSize: "0.7rem"}} className='card-text'><small className='text-muted'> By {!author?"Unknown": author} on {new Date(date).toGMTString()} </small></p>
                    <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
                </div>
          </div>
      </div>
    )
  
}
export default NewsItem