/*:
 * @target MZ
 * @plugindesc Skips title or auto-loads Save 0 (auto-save) and triggers a Common Event.
 * @author Moonwood Games
 * * @param CommonEventID
 * @text Common Event ID
 * @type common_event
 * @default 1
 * @desc The ID of the Common Event to run after auto-loading.
 */

(() => {
    const pluginName = "AutoLoadSkipTitle";
    const parameters = PluginManager.parameters(pluginName);
    const commonEventId = Number(parameters['CommonEventID'] || 1);

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        // Skip if this is a battle or event test from the editor
        if (DataManager.isBattleTest() || DataManager.isEventTest()) return;

        // Check if Save Slot 1 exists
        if (DataManager.savefileInfo(0)) {
            this.loadGameInBoot();
        } else {
            this.startNewGameInBoot();
        }
    };

    // Logic for loading the existing save
    Scene_Boot.prototype.loadGameInBoot = function() {
        DataManager.loadGame(0)
            .then(() => {
                Scene_Map.prototype.onLoadSuccess = function() {
                    Scene_Base.prototype.onLoadSuccess.call(this);
                };
                // Trigger the Common Event for idle processing
                $gameTemp.reserveCommonEvent(40);
                SceneManager.goto(Scene_Map);
				AudioManager.playBgm({name: 'Unbawksed' + $gameVariables.value(41), volume: $gameVariables.value(337), pitch: 100});
				AudioManager._bgmBuffer._loop = false;
				//Update this variable when adding new chicken sounds
				$gameVariables.setValue(336, 20);
            })
            .catch(() => {
                // If loading fails for some reason, fallback to New Game
                this.startNewGameInBoot();
            });
    };

    // Logic for starting fresh if no save is found
    Scene_Boot.prototype.startNewGameInBoot = function() {
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
		//Update this variable when adding new chicken sounds
		$gameVariables.setValue(336, 20);
    };
})();