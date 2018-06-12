export default class StatementMaker {

  static alteredStatement(statement) {
    if (statement.slice(0, 2) === 'I ') {
      return statement.slice(2)
    } else {
      return ('think', statement)
    }
  }

  static createStatement(feeling, thing, category) {
    if (category === 'verb') {
      return this.verbStatement(feeling, thing)
    } else {
      return this.descriptionStatement(thing, feeling)
    }
  }

  static defaultFeeling(category) {
    if (category === 'verb') {
      return 'opinion verb'
    } else {
      return 'opinion description'
    }
  }

  static descriptionAddOn(category){
    if (category === 'description'){return 'think/believe/feel that'}
  }

  static descriptionStatement(thing, feeling) {
    if (!thing && !feeling) {
      return 'Something is described'
    } else if (thing && !feeling) {
      return `${thing} ${this.presTenseVerb(thing)} described`
    } else if (!thing && feeling) {
      return `Something ${feeling}`
    } else {
      return `${thing} ${feeling} `
    }
  }

  static presTenseVerb(thing) {
    if (thing) {
      if (thing[thing.length - 1] === 's') {
        return 'are'
      } else {
        return 'is'
      }
    }
  }

  static verbStatement(feeling, thing) {
    if (!feeling && !thing) {
      return 'I believe/feel/think something about something/someone'
    } else if (!feeling && thing) {
      return `I believe/feel/think something about ${thing}`
    } else if (feeling && !thing) {
      return `I ${feeling} something/someone`
    } else {
      return `I ${feeling} ${thing}`
    }
  }
}
