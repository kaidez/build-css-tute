###
Function for building out player pages
###
setPlayer = do ->
  frag = document.createDocumentFragment()
  playerData = {
    "courtois": {
      "name":"Thibault Courtois"
      "position": "Goalkeeper"
      "number": "1"
    },
    "fabregas": {
      "name":"Cesc Fabregas"
      "position": "Attacking Midfielder"
      "number": "4"
    },
    "drogba": {
      "name":"Didier Drogba"
      "position": "Center Forward"
      "number": "11"
    },
    "terry": {
      "name":"John Terry"
      "position": "Center Fullback"
      "number": "26"
    },
    "casillas": {
      "name":"Iker Casillas"
      "position": "Goalkeeper"
      "number": "1"
    },
    "ramos": {
      "name":"Sergio Ramos"
      "position": "Center Fullback"
      "number": "4"
    },
    "bale": {
      "name":"Gareth Bale"
      "position": "Winger"
      "number": "11"
    },
    "ronaldo": {
      "name":"Cristiano Ronaldo"
      "position": "Center Forward"
      "number": "7"
    },
    "abbiati": {
      "name":"Christian Abbiati"
      "position": "Goalkeeper"
      "number": "1"
    },
    "alex": {
      "name":"Alex"
      "position": "Center Fullback"
      "number": "33"
    },
    "essien": {
      "name":"Michael Essien"
      "position": "Midfielder"
      "number": "15"
    },
    "torres": {
      "name":"Fernado Torres"
      "position": "Center Forward"
      "number": "9"
    }
  }

  for key of playerData
    targetID = "#" + key
    targetEl = $(targetID)
    playerName = document.createElement "h3"
    allInfo = document.createElement "div"
    playerPosition = document.createElement "p"
    playerNumber = document.createElement "p"
    playerPosition.setAttribute "class", "player-info"
    playerNumber.setAttribute "class", "player-info"
    playerName.innerText = playerData[key].name
    playerName.setAttribute "class", "player-name"
    playerPosition.innerText = playerData[key].position
    playerNumber.innerText = "#" + playerData[key].number
    allInfo.setAttribute "class", "all-player-info"
    allInfo.appendChild playerName
    allInfo.appendChild playerPosition
    allInfo.appendChild playerNumber
    frag.appendChild allInfo
    $(frag).appendTo targetEl
  return
