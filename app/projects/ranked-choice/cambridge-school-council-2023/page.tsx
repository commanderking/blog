import candidates from 'features/rankedChoice/cambridgeSchoolCouncil2023Data'
import RankedChoiceContainer from 'features/rankedChoice/Container'

const CambridgeElectionPage = () => {
  return <RankedChoiceContainer candidates={candidates} availablePositions={6} totalRounds={9} />
}

export default CambridgeElectionPage
