import { Component } from "react";
import {withRouter} from 'react-router-dom'

class CommentForm extends Component {
    render (){
        return (
            <div>
                <form>
                    <div class="rating">
                        <input id="star5" name="star" type="radio" value="5" class="radio-btn hide" />
                        <label for="star5" >☆</label>
                        <input id="star4" name="star" type="radio" value="4" class="radio-btn hide" />
                        <label for="star4" >☆</label>
                        <input id="star3" name="star" type="radio" value="3" class="radio-btn hide" />
                        <label for="star3" >☆</label>
                        <input id="star2" name="star" type="radio" value="2" class="radio-btn hide" />
                        <label for="star2" >☆</label>
                        <input id="star1" name="star" type="radio" value="1" class="radio-btn hide" />
                        <label for="star1" >☆</label>
                        <div class="clear"></div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(CommentForm)