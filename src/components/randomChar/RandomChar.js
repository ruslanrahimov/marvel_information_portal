import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: {}, loading: true, error: false
        }
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.onUpdateChar()
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onUpdateChar = () => {
        this.onCharLoading()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService.getCharacter(id).then(res => {
            this.setState({char: res, loading: false})
        }).catch(() => this.setState({loading: false, error: true}))
    }


    render() {
        const {char, loading, error} = this.state
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error) ? <View char={char}/> : null
        return (<div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={this.onUpdateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>)
    }

}

const View = ({char}) => {
    const {name, description, thumbnail, detail, wiki} = char;
    return (<div className="randomchar__block">
        <img style={thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : {objectFit: 'cover'}} src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description !== '' ? description : 'Description will be added very soon :('}
            </p>
            <div className="randomchar__btns">
                <a href={detail} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>)
}

export default RandomChar;