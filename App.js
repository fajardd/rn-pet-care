import { Text, View } from "react-native";
import { withExpoSnack } from "nativewind";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const App = () => {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText className="text-red-500 mt-20 text-5xl">
        Hello world
      </StyledText>
    </StyledView>
  );
};

export default withExpoSnack(App);
