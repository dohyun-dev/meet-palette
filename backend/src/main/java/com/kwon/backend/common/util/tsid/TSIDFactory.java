package com.kwon.backend.common.util.tsid;

import com.github.f4b6a3.tsid.TsidCreator;

public class TSIDFactory {
    public static long generateTSID() {
        return TsidCreator.getTsid256().toLong();
    }
}
