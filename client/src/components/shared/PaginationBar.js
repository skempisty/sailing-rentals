import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Pagination } from 'react-bootstrap'

import { breakpoints } from '../../config'


const ResponsivenessWrapper = styled.div`
  .to-end {
    display: none;
  }
  
  @media only screen and (min-width: ${breakpoints.desktop}) {
    .to-end {
      display: block;
    }
  }
`

export default class PaginationBar extends React.Component {
  /**
   * Returns the page number that pagination numbered buttons should start at
   * when the component is being used on a desktop or tablet browser
   * @returns {number} starting number for pagination numbered buttons
   */
  get startPageNumBarAt() {
    const { currentPage, pageCount } = this.props;
    /*
     * Constants below are set up to maintain at least 10 numbers on bar if there are 10 or more pages.
     * Pagination behavior is modeled off Google search pagination
     */
    let startPageNumBarAt = 1;

    if (pageCount > 10) {
      if (currentPage >= pageCount - 4) {
        startPageNumBarAt = pageCount - 9;
      } else if (currentPage >= 7) {
        startPageNumBarAt = currentPage - 5;
      }
    }

    return startPageNumBarAt;
  }

  get onFirstPage() {
    const { currentPage } = this.props

    return currentPage <= 1
  }

  get onLastPage() {
    const { currentPage, pageCount } = this.props

    return currentPage >= pageCount
  }

  render() {
    const { margin, currentPage, pageCount, onPageChange } = this.props

    const barLength = pageCount >= 10 ? 10 : pageCount

    return (
      <ResponsivenessWrapper>
        <Pagination style={{ margin, justifyContent: 'center' }}>
          <Pagination.First
            className='to-end'
            disabled={this.onFirstPage}
            onClick={() => onPageChange(1)}
          />

          <Pagination.Prev
            className='to-prev-next'
            disabled={this.onFirstPage}
            onClick={() => onPageChange(currentPage - 1)}
          />

          {Array(barLength).fill().map((_, i) =>
            <Pagination.Item
              key={'paginationBtn-' + i}
              disabled={currentPage === this.startPageNumBarAt + i}
              onClick={() => onPageChange(this.startPageNumBarAt + i)}
            >
              {this.startPageNumBarAt + i}
            </Pagination.Item>
          )}

          <Pagination.Next
            className='to-prev-next'
            disabled={this.onLastPage}
            onClick={() => onPageChange(currentPage + 1)}
          />

          <Pagination.Last
            className='to-end'
            disabled={this.onLastPage}
            onClick={() => onPageChange(pageCount)}
          />
        </Pagination>
      </ResponsivenessWrapper>
    )
  }
}

PaginationBar.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  margin: PropTypes.string
}
