import React, { useState } from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function BankList(props){
  const handleFav = props.onFav
  const handleUnfav = props.onUnFav
  const banks = props.banks
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal)
  const [modalBank, setModalBank] = useState({NAME: "", CERT: "", CITY: "", STNAME: "", ZIP: "", DATEUPDT: "", ADDRESS: ""})
  
  function showInfo(e){
    toggle()
    setModalBank(e)}

  function handleModalFav(e){
    toggle()
    props.onFav(e.target.value)
  }

  function handleModalUnfav(e){
    toggle()
    props.onUnFav(e.target.value)
  }
  
  const mapBanks = bank => {return <div key={bank.data.ID}>

  {(props.fav === true) ?
   <li><span className="bankname" onClick={toggle}>{bank.data.NAME}</span> <span className="star" onClick={() => handleUnfav(bank.data.CERT)}>&#9733;</span></li>
:  <li><span className="bankname" onClick={() => showInfo(bank.data)}>{bank.data.NAME}</span> <span className="star" onClick={() => handleFav(bank.data.CERT)}>&#9734;</span></li>
}
</div>}

  const bankList = banks.map(mapBanks)

         return (<React.Fragment>
           <div>{bankList}</div>
           <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader className="banknameModal" style={{backgroundColor: 'lightcyan'}} toggle={toggle}>{modalBank.NAME}</ModalHeader>
          <ModalBody>
            <div className="city">{modalBank.ADDRESS}</div>
             <div className="city">{modalBank.CITY}, {modalBank.STNAME}, {modalBank.ZIP}</div>
             <div className="cert"><b>Certification Number: </b>{modalBank.CERT}</div>
            <div><b>Last Updated: </b>{modalBank.DATEUPDT}</div>
          </ModalBody>
            <ModalFooter style={{backgroundColor: 'lightcyan'}}>
     {(props.fav === true) ?
    <Button color="primary" onClick={(e) => handleModalUnfav(e)} value={modalBank.CERT} >Remove from Faves &#9733;</Button>
  :  <Button color="secondary" onClick={(e) => handleModalFav(e)} value={modalBank.CERT} >Add to Faves &#9733;</Button>
  }
    </ModalFooter></Modal>
    </React.Fragment>)}
  

  
       
 
 
