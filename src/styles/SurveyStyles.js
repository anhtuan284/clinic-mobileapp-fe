import { StyleSheet } from "react-native";

const SurveyStyles = StyleSheet.create({
    questionHeading: {
        fontSize: 20, color: `#333`
    },
    questionSection: {
        marginBottom: 12
    },
    surveyContainer: { padding: 12 },
    dailySurveyHeading: {fontSize: 18, fontStyle: `italic`, marginBottom: 12, textAlign: `center`}
});

export default SurveyStyles;