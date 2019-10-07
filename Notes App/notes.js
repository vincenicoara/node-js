const fs = require('fs')
const chalk = require('chalk')

const green = chalk.green.bold.inverse
const red = chalk.red.bold.inverse
const yellow = chalk.grey.bold

const listNotes = () => {
    const notes = loadNotes()
    console.log(yellow.inverse("Your notes:\n"))
    notes.forEach((note) => {
        console.log(chalk.yellow.italic(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note){
        console.log(chalk.grey.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(red('Note not found!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title !== title)
    if (notes.length != newNotes.length){
        saveNotes(newNotes)
        console.log(green("Removed note with title: " + title))
    } else {
        console.log(red('There was no existing note with title: ' + title))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicate = notes.find((note) => note.title === title)
    if (!duplicate){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(green('New note added'))
    } else {
        console.log(red('Note title is already taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    console.log('writing: ' + dataJSON)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    readNote: readNote,
    removeNote: removeNote,
    listNotes: listNotes
}

