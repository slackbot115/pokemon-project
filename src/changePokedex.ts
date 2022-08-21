const changeToGameboy = document.querySelector("#gameboy") as HTMLImageElement;
changeToGameboy.addEventListener("click", () => {
  changeConsoleVersion("gb");
});

const changeToGameboyColor = document.querySelector(
  "#gameboycolor"
) as HTMLImageElement;
changeToGameboyColor.addEventListener("click", () => {
  changeConsoleVersion("gbc");
});

const changeToGameboyAdvance = document.querySelector(
  "#gameboyadvance"
) as HTMLImageElement;
changeToGameboyAdvance.addEventListener("click", () => {
  changeConsoleVersion("gba");
});

const changeToAnimated = document.querySelector(
  "#animated"
) as HTMLImageElement;
changeToAnimated.addEventListener("click", () => {
  changeConsoleVersion("anim");
});

function changeConsoleVersion(selectedVersion: string) {
  if (selectedVersion === "gb") {
    window.localStorage.setItem("consoleVersion", "gb");
  } else if (selectedVersion === "gbc") {
    window.localStorage.setItem("consoleVersion", "gbc");
  } else if (selectedVersion === "gba") {
    window.localStorage.setItem("consoleVersion", "gba");
  } else if (selectedVersion === "anim") {
    window.localStorage.setItem("consoleVersion", "anim");
  } else {
    window.location.reload();
  }

  window.location.href = "pokedex.html";
}
