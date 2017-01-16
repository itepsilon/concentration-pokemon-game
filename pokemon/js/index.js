"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// The back of the cards
var POKEBALL = "http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest";

// The front of the cards
var BULBASAUR = "http://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png";
var CHARMANDER = "http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png";
var SQUIRTLE = "http://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png";
var PIKACHU = "http://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png";
var JIGGLYPUFF = "http://cdn.bulbagarden.net/upload/thumb/3/3e/039Jigglypuff.png/250px-039Jigglypuff.png";
var ABRA = "http://cdn.bulbagarden.net/upload/6/62/063Abra.png";
var GYARADOS = "http://cdn.bulbagarden.net/upload/4/41/130Gyarados.png";
var MEWTWO = "http://cdn.bulbagarden.net/upload/thumb/7/78/150Mewtwo.png/250px-150Mewtwo.png";
var YOUWIN = "http://bbsimg.ngfiles.com/1/24409000/ngbbs50e4c4e6e051d.jpg";

var Card = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Card.prototype.render = function render() {
    var _this2 = this;

    var img_url = this.props.flipped ? this.props.img : POKEBALL;
    var divStyle = {
      backgroundImage: 'url(' + img_url + ')'
    };
    return React.createElement("div", { className: "card", style: divStyle, onClick: function onClick() {
        return _this2.props.onClick();
      } });
  };

  return Card;
}(React.Component);

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    var cards = props.monsters.map(function (image) {
      return { "img": image, "flipped": false, "matched": false };
    });
    _this3.state = {
      cards: cards,
      selected: [],
      score: 0
    };
    return _this3;
  }

  Board.prototype.handleClick = function handleClick(i) {
    var _this4 = this;

    var cards = this.state.cards.slice();
    var selected = this.state.selected.slice();
    var score = this.state.score;
    if (!cards[i].matched) {
      switch (this.state.selected.length) {
        case 0:
          selected.push(i);
          cards[i].flipped = !cards[i].flipped;
          break;
        case 1:
          if (selected[0] == i) {
            cards[i].flipped = !cards[i].flipped;
            selected.pop();
          } else {
            selected.push(i);
            cards[i].flipped = !cards[i].flipped;
            this.setState({
              cards: cards,
              selected: selected,
              score: score
            }, function () {
              window.setTimeout(_this4.handleClick.bind(_this4), 1000, i);
            });
            return;
          }
          break;
        case 2:
          var card1 = selected.pop();
          var card2 = selected.pop();
          if (cards[card1].img == cards[card2].img) {
            cards[card1].matched = true;
            cards[card2].matched = true;
            score = score + 1;
          } else {
            cards[card1].flipped = false;
            cards[card2].flipped = false;
          }
      }
      this.setState({
        cards: cards,
        selected: selected,
        score: score
      });
    }
  };

  Board.prototype.renderCard = function renderCard(i) {
    var _this5 = this;

    return React.createElement(Card, { flipped: this.state.cards[i].flipped, img: this.state.cards[i].img, onClick: function onClick() {
        return _this5.handleClick(i);
      } });
  };

  Board.prototype.render = function render() {
    var img_url = this.state.score == 4 ? YOUWIN : "";
    var divStyle = {
      backgroundImage: 'url(' + img_url + ')'
    };
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "row" },
        "Score: ",
        this.state.score
      ),
      React.createElement(
        "div",
        { className: "row" },
        this.renderCard(0),
        this.renderCard(1),
        this.renderCard(2)
      ),
      React.createElement(
        "div",
        { className: "row" },
        this.renderCard(3),
        React.createElement("div", { className: "card", style: divStyle, disable: true }),
        this.renderCard(4)
      ),
      React.createElement(
        "div",
        { className: "row" },
        this.renderCard(5),
        this.renderCard(6),
        this.renderCard(7)
      )
    );
  };

  return Board;
}(React.Component);

var Concentration = function (_React$Component3) {
  _inherits(Concentration, _React$Component3);

  function Concentration() {
    _classCallCheck(this, Concentration);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Concentration.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Board, { monsters: [BULBASAUR, CHARMANDER, SQUIRTLE, PIKACHU, CHARMANDER, BULBASAUR, SQUIRTLE, PIKACHU] })
    );
  };

  return Concentration;
}(React.Component);

React.render(React.createElement(Concentration, null), document.getElementById('container'));