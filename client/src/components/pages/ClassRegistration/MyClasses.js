import React, { useEffect, useState } from 'react'

import Box from '../../shared/styled-system/Box'
import Title from "../../shared/styled-system/Title";
import {useClasses} from "../../../store/classes";

const ClassCatalog = () => {
  const { classes } = useClasses()

  return (
    <Box>
      <Title as='h2'>In Progress</Title>

      <Title as='h2'>Upcoming</Title>

      <Title as='h2'>Past</Title>
    </Box>
  )
}

export default ClassCatalog
