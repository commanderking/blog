import candidates from 'features/rankedChoice/cambridgeSchoolCouncil2023Data'
import RankedChoiceContainer from 'features/rankedChoice/Container'

const roundComments = [
  {
    round: 1,
    text: (
      <div>
        <ul className="list-disc">
          <li>First place votes tallied.</li>
        </ul>
      </div>
    ),
  },
  {
    round: 2,
    text: (
      <div>
        <ul className="list-disc">
          <li>Rachel Weinstein is elected.</li>
          <li>Her 614 surplus votes are transferred to remaining candidates.</li>
          <li>
            Cambridge uses the{' '}
            <a href="https://www.opavote.com/methods/cambridge-stv-rules">Cincinnati method</a> to
            determine which ballots to transfer.
          </li>
        </ul>
      </div>
    ),
  },
  {
    round: 3,
    text: (
      <div>
        <ul className="list-disc">
          <li>Hudson is elected.</li>
          <li>Her 479 surplus votes are transferred to remaining candidates.</li>
        </ul>
      </div>
    ),
  },
  {
    round: 4,
    text: (
      <div>
        <ul className="list-disc">
          <li>All candidates with fewer than 50 votes are eliminated.</li>
          <li>Write-in 1, Write-in 2, and Write-in 3 are defeated.</li>
          <li>46 votes are transferred to remaining candidates, but 35 of these are exhaused.</li>
        </ul>
      </div>
    ),
  },
  {
    round: 5,
    text: (
      <div>
        <ul className="list-disc">
          <li>Alborz Bejnood is defeated.</li>
          <li>450 votes are transferred to remaining candidates.</li>
        </ul>
      </div>
    ),
  },
  {
    round: 6,
    text: (
      <div>
        <ul className="list-disc">
          <li>Pierre is defeated.</li>
          <li>906 votes are transferred.</li>
        </ul>
      </div>
    ),
  },
  {
    round: 7,
    text: (
      <div>
        <ul className="list-disc">
          <li>Travers is defeated. 1033 votes are transferred. </li>
        </ul>
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
