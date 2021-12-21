import React from 'react'

import Box from '../../shared/styled-system/Box'
import Title from '../../shared/styled-system/Title'
import Text from '../../shared/styled-system/Text'
import List from '../../shared/styled-system/List'
import ListItem from '../../shared/styled-system/ListItem'

import { siteColors } from '../../../utils/constants'

const ClassInfo = () => {
  return (
    <Box>
      <Title as='h2'>Sailing Class Information</Title>

      <Box marginBottom='1.5em'>
        <Box>Successfully completing this class qualifies you with <Text fontSize='1.2em' fontWeight='bold' color={siteColors.gold}>Keelboat Skipper C qualification</Text>.</Box>
        <Box>This lets you rent the Navy Santana 22 ft boat or the 23 ft Pearson Electra in Monterey, whenever you want.</Box>
      </Box>


      <Title as='h3'>Pre-requisites</Title>

      <List>
        <ListItem>
          <Box><Text fontWeight='bold' color={siteColors.gold}>Join the Sailing Club</Text></Box>
          <Box>Membership is obtained automatically through membership in the NPS Foundation. Visit <a href='https://www.npsfoundation.org/login' target='_blank' rel='noreferrer'>the NPS Foundation website</a> to become a member.  Students are free.  Faculty and community members pay a fee (tax deductible), but this also gets you membership in the foundation and access to all they do.  Create a log in to manage your club memberships.</Box>
        </ListItem>

        <ListItem>
          <Box><Text fontWeight='bold' color={siteColors.gold}>Get the book</Text></Box>
          <Box>We use the book, <b>Start Sailing Right</b>, which you can <a href='https://www.amazon.com/Start-Sailing-Right-National-Instruction/dp/1882502485' target='_blank' rel='noreferrer'>purchase on amazon</a>.</Box>
          <Box>Please try to read the first 10 short chapters of the book before the first class.</Box>
        </ListItem>

        <ListItem>
          <Box><Text fontWeight='bold' color={siteColors.gold}>Learn some knots</Text></Box>
          <Box>Please learn to tie the following knots: <b>bowline, square knot, cleat hitch, and rolling hitch.</b></Box>
          <Box><a href='https://www.animatedknots.com' target='_blank' rel='noreferrer'>www.animatedknots.com</a> is a great resource. Practice with your shoe laces in case you do not have any string or ropes at home.</Box>
        </ListItem>
      </List>
    </Box>
  )
}

export default ClassInfo
