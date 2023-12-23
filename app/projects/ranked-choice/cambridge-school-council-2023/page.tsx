import candidates from 'features/rankedChoice/cambridgeSchoolCouncil2023Data'
import RankedChoiceContainer from 'features/rankedChoice/Container'

const roundComments = [
  {
    round: 1,
    text: (
      <div>
        <p>
          In the first round, both Rachel Weinstein and Elizabeth Clark Polner Hudson were elected
          for surpassing the quota. If this were single choice voting, the following candidates
          would have been elected:
        </p>
        <ul className="ml-8 list-decimal">
          <li>Rachel Weinstein</li>
          <li>Elizabeth Clark Polner Hudson</li>
          <li>Caroline Hunter</li>
          <li>King</li>
          <li>Weinstein</li>
          <li>Luis Rojas Villa</li>
        </ul>
      </div>
    ),
  },
  {
    round: 2,
    text: (
      <div>
        <p>
          {' '}
          In round 1, Rachel Weinstein received the most votes, surpassing the quota by 614 votes.
          In Cambridge's quota system, every vote over the quota needs to be redistributed to the
          other candidates if possible. In this case, of the original 3651 votes she received, 614
          of the 3651 ballots will be selected through the Droop system to redistribute to other
          candidates.{' '}
        </p>
      </div>
    ),
  },
  {
    round: 3,
    text: (
      <div>
        <p>
          Clark Poiner also exceed the quota by 479 votes. Her votes are redistributed to the
          remaining candidates.
        </p>
      </div>
    ),
  },
  {
    round: 4,
    text: (
      <div>
        <p>
          After reassigning the surplus ballots, all candidates who receive fewer than 50 votes are
          eliminated, which in this selection, includes all write-in votes. Of the 46 ballots who
          had write-ins as their first choice, 35 were exhausted. Their ballots either contained no
          additional candidates or only candidates who already had been elected.
        </p>
      </div>
    ),
  },
  {
    round: 5,
    text: (
      <div>
        <p>
          After those below 50 votes are eliminated, we eliminate the candidate with the next fewest
          votes. Bejnood has been eliminated. Of the 450 votes, the most went to Schraa Huh (105),
          who is in 7th place after this round of reallocation.
        </p>
      </div>
    ),
  },
  {
    round: 6,
    text: (
      <div>
        {' '}
        <p>
          In round 6, Pierre is eliminated. Of his 906 votes, 208 are exhausted. Hunter, the
          recipient of 116 of these votes, vaults past Weinstein.
        </p>
      </div>
    ),
  },
  {
    round: 7,
    text: (
      <div>
        <p>
          In round 7, Travers is eliminated. King, who at round 1 was in 4th place, is now in 6th,
          holding onto the final spot with only a 2 vote lead over Harding Jr.
        </p>
      </div>
    ),
  },
  {
    round: 8,
    text: (
      <div>
        <p>
          Schraa Huh is eliminated with the fewest votes. Harding Jr., receiving 280 of the
          transferred votes pulls ahead of King.
        </p>
      </div>
    ),
  },
  {
    round: 9,
    text: (
      <div>
        <p>King is the final candidate to be eliminated, trailing Harding Jr. by only 8 votes.</p>
      </div>
    ),
  },
]

const CambridgeElectionPage = () => {
  return (
    <div>
      <h3 className="text-2xl">
        Breakdown of Ranked Choice Voting - Cambridge 2023 School Council Elections
      </h3>
      <div className="m-8 ml-16 mr-16">
        <p>
          While in most cases single and ranked choice voting produce the same results, the 2023
          Cambridge school council elections did not. In this year's election,
        </p>
        <ul className="list-disc pl-8">
          <li>11 candidates vied for 6 council positions. 3 write-in candidates received votes.</li>
          <li>23,092 total ballots were submitted</li>
          <li>21,255 were valid. </li>
          <li>
            3037 votes were required to become elected . Any votes over 3037 would be reallocated to
            remaining candidates. (See{' '}
            {
              <a target="_blank" href="https://en.wikipedia.org/wiki/Droop_quota">
                Droop quota system
              </a>
            }
            )
          </li>
        </ul>
      </div>

      <RankedChoiceContainer
        candidates={candidates}
        roundComments={roundComments}
        availablePositions={6}
        totalRounds={9}
      />
    </div>
  )
}

export default CambridgeElectionPage
