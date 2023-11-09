

export function dateAndTime(){
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()
    return `${date} ${time}`
  }

  