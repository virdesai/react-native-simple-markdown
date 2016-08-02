import React, { Component } from 'react'
import { View } from 'react-native'
import SimpleMarkdown from 'simple-markdown'
import initialRules from './rules'
import _ from 'lodash'

const styles = {
  view: {
  },
  codeBlock: {
    fontFamily: 'Courier',
    fontWeight: '500'
  },
  del: {
    containerBackgroundColor: '#222222'
  },
  em: {
    fontStyle: 'italic'
  },
  heading: {
    fontWeight: '200'
  },
  heading1: {
    fontSize: 32
  },
  heading2: {
    fontSize: 24
  },
  heading3: {
    fontSize: 18
  },
  heading4: {
    fontSize: 16
  },
  heading5: {
    fontSize: 13
  },
  heading6: {
    fontSize: 11
  },
  hr: {
    backgroundColor: '#cccccc',
    height: 1
  },
  image: {
    width: 300,
    height: 300,
  },
  inlineCode: {
    backgroundColor: '#eeeeee',
    borderColor: '#dddddd',
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: 'Courier',
    fontWeight: 'bold'
  },
  list: {
  },
  listItem: {
    flexDirection: 'row'
  },
  listItemBullet: {
    fontSize: 20,
    lineHeight: 20,
    marginTop: 6,
  },
  listItemNumber: {
    fontWeight: 'bold'
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  strong: {
    fontWeight: 'bold'
  },
  table: {
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 3
  },
  tableHeader: {
    backgroundColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tableHeaderCell: {
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 5
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tableRowLast: {
    borderColor: 'transparent'
  },
  tableRowCell: {
    padding: 5
  },
  text: {
    color: '#222222'
  },
  u: {
    borderColor: '#222222',
    borderBottomWidth: 1
  }
}

class Markdown extends Component {
  static defaultProps = {
    style: styles
  }
  componentWillMount() {
    const mergedStyles = _.merge({}, styles, this.props.style)
    let rules = initialRules(mergedStyles)
    rules = _.merge({}, SimpleMarkdown.defaultRules, rules)

    const parser = SimpleMarkdown.parserFor(rules)
    this.parse = (source) => {
      const blockSource = source + '\n\n'
      return parser(blockSource, { inline: false })
    }
    this.renderer = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'))
  }
  render() {
    const child = _.isArray(this.props.children)
      ? this.props.children.join('') : this.props.children
    const tree = this.parse(child)
    return <View style={[styles.view, this.props.style.view]}>{this.renderer(tree)}</View>
  }
}

export default Markdown