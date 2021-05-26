import HomePage from '../HomePage'
import renderer from 'react-test-renderer'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Home Page', () => {
    it('should match snapshot', () => {
        const navigationBarRender = renderer.create(<HomePage />).toJSON()
        expect(navigationBarRender).toMatchSnapshot()
    })

})
