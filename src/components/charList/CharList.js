import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import './charList.scss';


class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: []
        }
    }

    marvelService = new MarvelService()

    onListUpdate = () => {
        this.marvelService.getAllCharacters().then(res => this.setState({
            info: res
        }))
    }

    componentDidMount() {
        this.onListUpdate()
    }

    render() {
        const charListItems = this.state.info.map(char => <CharCard key={char.id} thumbnail={char.thumbnail} name={char.name}/>)
        return (<div className="char__list">
            <ul className="char__grid">
                {charListItems}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>)
    }

}

const CharCard = ({thumbnail, name}) => {
    return (
        <li className="char__item">
            <img style={thumbnail.includes('image_not_available') ? {objectFit: 'fill'} : {objectFit: 'cover'}} src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;