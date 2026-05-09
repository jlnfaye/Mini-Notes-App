import { Stack } from "expo-router";

export default function NoteLayout(){
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#111",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            }}
        >

            <Stack.Screen
                name="notes"
                options={{
                    title: "Note List"
                }}
            />

            <Stack.Screen
                name="add-notes"
                options={{
                    title: "Add List"
                }}
            />

            <Stack.Screen
                name="edit-notes"
                options={{
                    title: "Edit List"
                }}
            />

            <Stack.Screen
                name="notes-details"
                options={{
                    title: "Note Details"
                }}
            />

        </Stack>
    )
}


