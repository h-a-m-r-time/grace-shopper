export default class StatementMaker {

  static createStatement(feeling, thing, category) {
    if (category === 'verb') {
      return this.verbStatement(feeling, thing)
    } else {
      return this.descriptionStatement(feeling, thing)
    }
  }


  static defaultFeeling(category) {
    if (category === 'verb') {
      return 'singular verb'
    } else {
      return 'description'
    }
  }

  static descriptionStatement(thing, feeling) {
    if (!thing && !feeling) {
      return 'Something is described'
    } else if (thing && !feeling) {
      return `${thing} ${this.presTenseVerb(thing)} described`
    } else if (!thing && feeling) {
      return `Something ${feeling}`
    } else {
      return `${thing} ${this.presTenseVerb(thing)} ${feeling} `
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
      return 'believe/feel/think something about something'
    } else if (!feeling && thing) {
      return `believe/feel/think something about ${thing}`
    } else if (feeling && !thing) {
      return `${feeling} something`
    } else {
      return `${feeling} ${thing}`
    }
  }


}
