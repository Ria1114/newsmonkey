import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props) => {

   const [articles, setArticles] = useState([ ])
   const [spinner, setSpinner] = useState(true)
   const [page, setPage] = useState(1)
   const [totalResults, setTotalResults] = useState(0)
   
   
      const capitalizeFirstLetter = (string)=>{
               return string.charAt(0).toUpperCase() + string.slice(1);
           }
       
       const updateNews = async () => {
           props.setProgress(10);
           
           const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
           setSpinner(true)
           let data = await fetch(url);
           props.setProgress(30);
           let parsedData = await data.json();
           props.setProgress(70);
           setArticles(parsedData.articles)
           setTotalResults(parsedData.totalResult)
           setSpinner(false)
           
           props.setProgress(100);
        }
        
        useEffect(() => {
            document.title =`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
            updateNews();
     } , [])

    // const handlePrevClick = async ()=>{
    //     setPage(page - 1)
    //     updateNews();
       
    // }
    // const handleNextClick = async ()=>{
    //     setPage(page + 1)
    //     updateNews();

    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    
      };


    return (
      <>
         <h2  className='my-3 mx-3 text-center' style={{padding:"30px",fontSize:"2.6rem" ,paddingTop:"120px"}}>NewsMonkey - Top Headlines</h2>
         <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} Spinner={<Spinner/>}>
                <div className="container">
                    <div className='row my-3 mx-3'>
                            { articles.map((element)=>{
                            return <div className='col-md-4' key={element.url}>
                            <NewsItem  title={element.title?element.title.slice(0,60):" "} description={element.description?element.description.slice(0,150):" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                </div> 
                            })}
                    </div>  
                </div>
         </InfiniteScroll>
         {/* <div className="container d-flex justify-content-between">
            <button disabled={page<=1} type='button' onClick={handlePrevClick} className='btn btn-dark mx-3 my-3 '>&larr; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResult/20)} type='button' onClick={handleNextClick} className='btn btn-dark mx-3 my-3 '>Next &rarr;</button>
         </div> */}
        
      </>
    )
  
}

News.defaultProps = {
    country : 'in',
    pageSize: 7,
    category: 'general',
} 
News.propTypes = {
   country : PropTypes.string,
   pageSize : PropTypes.number
}

export default News;