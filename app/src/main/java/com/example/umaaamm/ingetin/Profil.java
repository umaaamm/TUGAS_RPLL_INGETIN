package com.example.umaaamm.ingetin;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.support.v7.app.AppCompatActivity;

/**
 * A simple {@link Fragment} subclass.
 */
public class Profil extends Fragment {


    public Profil() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        ((AppCompatActivity) getActivity()).getSupportActionBar().hide();
        return inflater.inflate(R.layout.fragment_profil, container, false);
//        View layout = inflater.inflate(R.layout.fragment_profil, container, false);




    }

}
