import React from "react";
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import '../style/Detail.css';
import axios from 'axios';
import Review from './Review';
import Star from './Star';
import review from '../lib/Review';


class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLoading2: true,
            rating: 0,
            reviewText: "",
            reviews: [],
            content: {}
        }
    }
    textChange = (e) => {
        if(e.target.value.length > 1000){
            alert("1000자 이하로 등록해 주세요");
            return;
        }
        this.setState({ reviewText: e.target.value })
    }
    getReviews = async () => {
        // var id = this.props.location.state.content._id;
        var id = this.props.location.state.content_id;
        await axios.get(`/content/review/${id}`, { id: id })
            .then(review => {
                this.setState({ reviews: review.data, isLoading: false });
            })
    }
    getContents = async () => {
        await axios.get("http://localhost:4000/content/")
            .then(data => {
                // this.props.dispatchContents(data.data);
                // this.setState({ contents: contents, showContents: contents, isLoading: false, dataNumber: data.data.length });
                // this.setState({ contents: contents, isLoading: false, dataNumber: data.data.length });
                this.props.dispatchContents(data.data);
                for(let i=0;i<data.data.length;i++){
                    if(data.data[i]._id === this.props.location.state.content_id){
                        this.setState({ content: data.data[i], isLoading2: false });
                        break;
                    }
                }
            })
    };

    componentDidMount() {
        if (this.props.location.state === undefined) {
            this.props.history.push("/");
        }
        this.getReviews();
        this.getContents();
    }
    clickStar = (e) => {
        var rating = parseInt(e.target.title);
        this.setState({ rating: rating });
        var temp, i;
        for (i = 1; i <= rating; i++) {
            temp = document.getElementById(i);
            if (i % 2 !== 0) {
                temp.style.backgroundPosition = "0px -1031.5px";
            } else {
                temp.style.backgroundPosition = "-13px -1031.5px";
            }
        }
        for (i = rating + 1; i <= 10; i++) {
            temp = document.getElementById(i);
            if (i % 2 !== 0) {
                temp.style.backgroundPosition = "0px -1060px";
            } else {
                temp.style.backgroundPosition = "-13px -1060px";
            }
        }
    }
    makeReview = () => {
        if (this.props.state.isLogin === false) {
            alert("로그인 후 이용해주세요");
            return;
        }
        if(this.state.rating === 0){
            alert("평점을 입력해주세요");
            return;
        }
        if (this.state.reviewText === "") {
            alert("리뷰를 작성해주세요");
            return;
        }
        if (this.state.reviewText.length < 10) {
            alert("최소 10자 이상 작성해주세요");
            return;
        }
        for(let i =0 ; i<this.state.reviews.length;i++){
            if(this.state.reviews[i].email === this.props.state.email){
                alert("이미 리뷰를 등록했습니다");
                return;
            }
        }

        axios.post('/content/createReview', {
            content_id: this.props.location.state.content_id,
            id: Date.now(),
            email: this.props.state.email,
            rating: this.state.rating,
            reviewText: this.state.reviewText
        })
        .then(function (res) {
            console.log(res);
            
            alert("리뷰를 등록하였습니다.");
            window.location.reload(true);
        })
        .catch(err => console.log('error : ', err));
    }

    render() {
        // const { content } = this.props.location.state;
        const { content } = this.state;
        
        console.log(this.state.content);
        // console.log(this.props.state.contents);
        // console.log(this.props);
        

            return (
                <div className="Detail">
                    {this.state.isLoading2 ? 
                    (<div></div>):
                    (<div className="content_info_area">
                        <div className="poster">
                            <img src={content.url} title={content.title} alt={content.title} />
                        </div>
                        <div className="content_info">
                            <h1 className="title">
                                {content.title}
                                <div className="year">({content.year})</div>
                                <div className={"age" + content.movieRating}>{content.movieRating}</div>
                            </h1>
                            <Star rating={content.rating} />
                            <div className="rating">{content.rating}</div>
                            <div className="ratingNumber">{content.ratingNumber}명 참여</div>
                            <br />

                            <div className="item">감독</div>
                            <div className="list">{this.state.content.director.map(direc => (
                                review.makeDirecLink(direc)
                            ))}</div>
                            <div className="item">배우</div>
                            <div className="list" >{content.actors.map(actor => (
                                review.makeActorLink(actor)
                            ))}</div>
                            <div className="item">장르</div>
                            <div className="list">{content.genre.map(genre => (
                                review.makeGenreLink(genre)
                            ))}</div>

                            <div className="desc">{content.desc}</div>
                            <div className="clear"></div>
                        </div>

                    </div>)}

                    <div className="review">
                        <div className="btn_star">
                            <button type="button" className="btn_star1" id="1" title="1" onClick={this.clickStar}></button>
                            <button type="button" className="btn_star2" id="2" title="2" onClick={this.clickStar}></button>
                            <button type="button" className="btn_star1" id="3" title="3" onClick={this.clickStar}></button>
                            <button type="button" className="btn_star2" id="4" title="4" onClick={this.clickStar}></button>
                            <button type="button" className="btn_star1" id="5" title="5" onClick={this.clickStar}></button>
                            <button type="button" className="btn_star2" id="6" title="6" onClick={this.clickStar}></button>
                            <button type="button" className="btn_star1" id="7" title="7" onClick={this.clickStar}></button>
                            <button type="button" className="btn_star2" id="8" title="8" onClick={this.clickStar}></button>
                            <button type="button" className="btn_star1" id="9" title="9" onClick={this.clickStar}></button>
                            <button type="button" className="btn_star2" id="10" title="10" onClick={this.clickStar}></button>
                        </div>
                        <div className="ReviewTextArea">
                            <textarea value={this.state.reviewText} onChange={this.textChange} placeholder="리뷰를 작성해주세요. (최소 10자)"></textarea>
                            <p className="review_length">{this.state.reviewText.length}/1000</p>
                        </div>

                        <button className="btn_createReview" onClick={this.makeReview}>리뷰 등록</button>
                        <br />

                        {this.state.isLoading ? (
                            <div className="Loading">
                                <span>Loading...</span>
                            </div>
                        ) : (
                                <div className="reveiw_list">
                                    <ul>
                                        {this.state.reviews.map(review => (
                                            <Review
                                                review={review}
                                                _id={content._id}
                                            />
                                        ))}
                                    </ul>
                                    <div className="clear"></div>
                                </div>
                            )
                        }
                    </div> 
                </div>
            );
     
    }
}

const mapStateToProps = (state) => ({
    state: state
});
function mapDispatchToProps(dispatch) {
    return {
        dispatchContents: (contents) => dispatch(actionCreators.SetContents(contents))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Detail);