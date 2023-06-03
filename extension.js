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

/* exported init */

const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const Gio = imports.gi.Gio; 
const ExtensionUtils = imports.misc.extensionUtils;
const SourceMgr = imports.ui.status.keyboard.getInputSourceManager();

const SETTING_KEY_SWITCH_LAYOUT = 'switch-layout';

class Extension {
    constructor() {
    }

    enable() {
        this.settings = ExtensionUtils.getSettings();
    
        Main.wm.addKeybinding(
            SETTING_KEY_SWITCH_LAYOUT,
            this.settings,
            Meta.KeyBindingFlags.NONE,
            Shell.ActionMode.ALL,
            handleKey
        );
    }

    disable() {
        //This extension uses unlock-dialog mode to provide ability to change input source using Alt+Shift on lock screen.
        Main.wm.removeKeybinding(SETTING_KEY_SWITCH_LAYOUT);
    }
}

function init() {
    return new Extension();
}

function handleKey() {
    let max = Object.keys(SourceMgr.inputSources).length - 1;
    let current = SourceMgr.currentSource.index;
    if(current < max){
        SourceMgr.inputSources[current+1].activate();
    }else{
        SourceMgr.inputSources[0].activate();
    }
}

