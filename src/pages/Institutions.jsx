import React from 'react'
import BankList from './BankList'

class Institutions extends React.Component {

state = {
    banks: [],
    favList: [],
    favs: true
  };

componentDidMount(){
  localStorage.clear()
  localStorage.length !== 0 ? this.getFavs() : this.getBanks("")
}

getBanks(input){
fetch(`https://banks.data.fdic.gov/api/institutions?filters=NAME%3A%2A${input}%2A&fields=NAME%2C%20ZIP%2COFFDOM%2CCITY%2CZIP%2CSTNAME%2CSTALP%2CNAME%2CACTIVE%2CCERT%2CCBSA%2CASSET%2CADDRESS%2CDEP%2CDEPDOM%2CROE%2CROA%2CDATEUPDT%2COFFICES&sort_by=NAME&sort_order=ASC&limit=10&offset=0&format=json&download=false&filename=data_file`)
.then(res => res.json())
.then(res => {this.setState({banks: <BankList banks={res.data} fav={false} onFav={this.handleFav}/>, favs: false})})
.catch((err) => {return <div>Error: {err.message}</div>})
}

getFavs(){
if (localStorage.fav === "" || (!localStorage.fav)){  
  this.setState({favList: []})
  this.getBanks("")}
else{
const newFavList = localStorage.fav.split(",")
const newFavQuery = (localStorage.fav.replace(/,/g, "%2C%20"))
fetch(`https://banks.data.fdic.gov/api/institutions?filters=CERT%3A%28${newFavQuery}%29&fields=ZIP%2COFFDOM%2CCITY%2CZIP%2CSTNAME%2CSTALP%2CNAME%2CACTIVE%2CCERT%2CCBSA%2CASSET%2CADDRESS%2CDEP%2CDEPDOM%2CROE%2CROA%2CDATEUPDT%2COFFICES&sort_by=NAME&sort_order=ASC&limit=10&offset=0&format=json&download=false&filename=data_file`)
.then(res => res.json())
.then(res => {this.setState({banks: <BankList banks={res.data} fav={true} onUnFav={this.handleUnfav}/>, favList: newFavList, favs: true})})
.catch((err) => {return <div>Error: {err.message}</div>})}
}

handleFav = (e) => {
  const favList = this.state.favList
  favList.push(e)
  localStorage.setItem("fav", favList)
  this.getFavs()
}

handleUnfav = (e) => {
  const favList = this.state.favList
  const filtered = favList.filter(v => v !== e)
  localStorage.setItem("fav", filtered)
  this.getFavs()
}

searchBar = (input) => {
    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};

return (
  <React.Fragment>
      <div>
        <div ><input 
       className="sb"
       style={BarStyling}
       value={input}
       placeholder={"Select Institution"}
       onChange={(e) => this.getBanks(e.target.value)}
      /></div>
      {(this.state.favs === false && localStorage.fav) ? <button onClick={()=>{this.getFavs()}}>View Favorites</button> : <div />}
      </div>
      </React.Fragment>
    );
  }

    render(){
      return (
        <React.Fragment>
      <div col="sm">{this.searchBar()}</div>
      <div col="sm"><ul>{this.state.banks}</ul></div>
      </React.Fragment>)
    }

  }
    export default Institutions



