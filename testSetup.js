import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

console.log("RUNNING IN HERE")

const adapter = new Adapter()
enzyme.configure({ adapter })
