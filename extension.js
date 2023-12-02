/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import {wm} from 'resource:///org/gnome/shell/ui/main.js';
import {getInputSourceManager} from 'resource:///org/gnome/shell/ui/status/keyboard.js';

const SETTING_KEY_SWITCH_LAYOUT = 'switch-layout';

export default class SwitchLayoutExtension extends Extension {
    constructor(...args) {
        super(...args);
    }
    enable() {
        wm.addKeybinding(
            SETTING_KEY_SWITCH_LAYOUT,
            this.getSettings(),
            Meta.KeyBindingFlags.NONE,
            Shell.ActionMode.ALL,
            this.handleKey
        );

    }

    disable() {
        wm.removeKeybinding(SETTING_KEY_SWITCH_LAYOUT);
    }
    
    handleKey() {
        let sourceMgr = getInputSourceManager();

        let max = Object.keys(sourceMgr.inputSources).length - 1;
        let current = sourceMgr.currentSource.index;
        if(current < max){
           sourceMgr.inputSources[current+1].activate();
        }else{
           sourceMgr.inputSources[0].activate();
        }
    }
}
