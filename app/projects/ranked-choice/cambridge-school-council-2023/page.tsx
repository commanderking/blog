import candidates from 'features/rankedChoice/cambridgeSchoolCouncil2023Data'
import RankedChoiceContainer from 'features/rankedChoice/Container'

const roundComments = [
  {
    round: 1,
    text: (
      <div>
        <p>
          In the first round, both Rachel Weinstein and Elizabeth Clark Polner Hudson were elected
          for surpassing the quota of 3037 votes.{' '}
        </p>
      </div>
    ),
  },
  {
    round: 2,
    text: (
      <div>
        <p>
          Having surpassed the quota by 614 votes, this number must be transferred to the other
          candidates. To determine which of the 3651 ballots to select, Cambridge employs the{' '}
          <a href="https://www.opavote.com/methods/cambridge-stv-rules">Cincinnati method</a>, where
          ballots are numbered and every "n" ballots are selected. N is determined based on the
          total ballots and surplus ballots. More than 1/3 of these ballots went to David Weinstein
          (no relation).
        </p>
      </div>
    ),
  },
  {
    round: 3,
    text: (
      <div>
        <p>
          Hudson also exceeded the quota by 479 votes. Her votes are transferred to the remaining
          candidates.
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
        <ul className="mt-4 list-disc pl-8">
          <li>11 candidates vied for 6 council positions. 3 write-in candidates received votes.</li>
          <li>23,092 total ballots were submitted</li>
          <li>21,255 were valid. </li>
          <li>
            3037 votes were required to become elected . Any votes over 3037 are allocated to
            remaining candidates. (See{' '}
            {
              <a target="_blank" href="https://en.wikipedia.org/wiki/Droop_quota">
                Droop quota system
              </a>
            }
            )
          </li>
        </ul>
        <p className="mt-4">
          If this were single choice voting, the following candidates would have been elected:
        </p>
        <ul className="ml-8 mt-4 list-decimal">
          <li>Rachel Weinstein</li>
          <li>Elizabeth Hudson</li>
          <li>Caroline Hunter</li>
          <li>Andrew King</li>
          <li>David Weinstein</li>
          <li>Luis Rojas Villareal</li>
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
