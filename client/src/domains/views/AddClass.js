import { v4 as uuidv4 } from 'uuid'

import Klass from '../../models/Klass'

const randomClassId = uuidv4()

const defaultClassMtgs = [
  {
    id: uuidv4(),
    name: 'Classroom training 1',
    classId: randomClassId,
    instructorId: -1,
    boatId: null,
    details: 'this is the first classroom training',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'Classroom training 2',
    classId: randomClassId,
    instructorId: -1,
    boatId: null,
    details: 'this is the second classroom training',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'On-the-water training 1',
    classId: randomClassId,
    instructorId: -1,
    boatId: -1,
    details: 'this is the first on the water training',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'On-the-water training 2',
    classId: randomClassId,
    instructorId: -1,
    boatId: -1,
    details: 'this is the second on the water training',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'On-the-water training 3',
    classId: randomClassId,
    instructorId: -1,
    boatId: -1,
    details: 'this is the check sail',
    start: null,
    end: null
  }
]

const defaultClass = new Klass({
  capacity: 5,
  price: 225,
  // TODO: replace this hard coded default with a new setting
  details: `<div class="message-2qnXI6 cozyMessage-3V1Y8y mentioned-xhSam7 groupStart-23k01U wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica" tabindex="-1" role="article" data-list-item-id="chat-messages___chat-messages-902431836641316895" aria-setsize="-1" aria-roledescription="Message" aria-labelledby="message-username-902431836641316895 uid_1 message-content-902431836641316895 uid_2 message-timestamp-902431836641316895" aria-describedby=""> <div class="contents-2mQqc9"> <h2 id="message-content-902431836641316895" class="markup-2BOw-j messageContent-2qWWxC">Hello Future Sailors!</h2> <div class="markup-2BOw-j messageContent-2qWWxC">We are scheduling the next sail instruction class. Successful completion of the class qualifies you with Keelboat Skipper C qualification. This lets you rent the Navy Santana 22 ft boat or the 23 ft Pearson Electra in Monterey, whenever you want.</div> <div class="markup-2BOw-j messageContent-2qWWxC">&nbsp;</div> <div class="markup-2BOw-j messageContent-2qWWxC">We use the book, Start Sailing Right, which you can purchase at: <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB" tabindex="0" title="http://www.amazon.com/Start-Sailing-Right-National-Instruction/dp/1882502485" role="button" href="http://www.amazon.com/Start-Sailing-Right-National-Instruction/dp/1882502485" target="_blank" rel="noreferrer noopener">http://www.amazon.com/Start-Sailing-Right-National-Instruction/dp/1882502485</a>. Please try to read the first 10 chapters of the book before the first class. That's 60 pages, big print, and lots of pictures.</div> <div class="markup-2BOw-j messageContent-2qWWxC">&nbsp;</div> <div class="markup-2BOw-j messageContent-2qWWxC">Please learn to tie the following knots: bowline, square knot, cleat hitch, and rolling hitch. www.animatedknots.com is a great resource. Practice with your shoe laces in case you do not have any string or ropes at home.</div> <h3 class="markup-2BOw-j messageContent-2qWWxC">Costs:</h3> <ol> <li>You join the Sailing Club. Membership is obtained automatically through membership in the NPS Foundation. Visit <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB" tabindex="0" title="https://www.npsfoundation.org/page.aspx?pid=291" role="button" href="https://www.npsfoundation.org/page.aspx?pid=291" target="_blank" rel="noreferrer noopener">https://www.npsfoundation.org/page.aspx?pid=291</a> to become a member. Students are free. Faculty and community members pay a fee (tax deductible), but this also gets you membership in the foundation and access to all they do. Create a log in to manage your club memberships.</li> <li>The cost for the class is <strong>$250</strong>.</li> <li>Please note there will be no refund in case you are not able to finish the class.</li> </ol> <h3>Schedule:</h3> </div> <div class="buttonContainer-DHceWr"> <div class="buttons-cl5qTG container-3npvBV isHeader-2dII4U" aria-label="Message Actions">&nbsp;</div> </div> </div> <div class="message-2qnXI6 cozyMessage-3V1Y8y wrapper-2a6GCs cozy-3raOZG zalgo-jN1Ica" tabindex="-1" role="article" data-list-item-id="chat-messages___chat-messages-902431845973622824" aria-setsize="-1" aria-roledescription="Message" aria-labelledby="message-username-902431836641316895 uid_1 message-content-902431845973622824 uid_2 message-timestamp-902431845973622824" aria-describedby=""> <div class="contents-2mQqc9"><span class="latin24CompactTimeStamp-2V7XIQ timestamp-3ZCmNB timestampVisibleOnHover-2bQeI4 alt-1uNpEt"><time id="message-timestamp-902431845973622824" datetime="2021-10-26T05:41:58.453Z" aria-label="October 25, 2021 10:41 PM"></time></span>We will have a Saturday cohort and a Sunday cohort. Please let me know if you can do either with your preference, or if you can only do one, then which one. If you cannot make one week, we will try to work with you to reschedule, or swap with another student for the other day.</div> <div class="contents-2mQqc9">&nbsp;</div> <div class="contents-2mQqc9"><strong>Both Sat and Sun cohorts:</strong></div> <div class="contents-2mQqc9">8 July (Thursday) 1700 &ndash; 1830 Classroom training</div> <div class="contents-2mQqc9">15 July (Thursday) 1700 &ndash; 1830 Classroom training</div> <div class="contents-2mQqc9">&nbsp;</div> <div class="contents-2mQqc9"><strong>Saturday cohort (4 spots) 1000-1500</strong></div> <div class="contents-2mQqc9">10 July (Sat) on-the-water training</div> <div class="contents-2mQqc9">17 July (Sat) on-the-water training</div> <div class="contents-2mQqc9">24 July (Sat) on-the-water training (check sail)</div> <div class="contents-2mQqc9">&nbsp;</div> <div class="contents-2mQqc9"><strong>Sunday cohort (4 spots) 1000 - 1500</strong></div> <div class="contents-2mQqc9">11 July (Sun) on-the-water training</div> <div class="contents-2mQqc9">18 July (Sun) on-the-water training</div> <div class="contents-2mQqc9">25 July (Sun) on-the-water training (check sail)</div> <div class="contents-2mQqc9">&nbsp;</div> <div class="contents-2mQqc9">*remember sailing is a weather dependent activity, we may have to reschedule a date due to weather.</div> <div class="contents-2mQqc9">&nbsp;</div> <div class="contents-2mQqc9">- Sailing Class Coordinator</div> </div>`,
  meetings: defaultClassMtgs
})

/**
 * -1 classId indicates we're crafting a new Class.
 * @param {number|string} classId
 * @returns {boolean}
 */
const isNewClass = (classId) => Number(classId) < 0

const getFreshClassMtg = (classId = null) => {
  return {
    id: uuidv4(),
    name: 'New Mtg',
    classId: classId || randomClassId,
    instructorId: -1,
    boatId: null,
    details: 'Something should be taught here',
    start: null,
    end: null
  }
}

export default {
  defaultClass,
  defaultClassMtgs,
  isNewClass,
  getFreshClassMtg
}
