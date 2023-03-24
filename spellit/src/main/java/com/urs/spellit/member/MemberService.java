package com.urs.spellit.member;

import com.urs.spellit.common.util.SecurityUtil;
import com.urs.spellit.game.DeckRepository;
import com.urs.spellit.game.GameService;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.dto.MemberResponseDto;
import com.urs.spellit.member.model.entity.Member;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private Logger log = LoggerFactory.getLogger(MemberService.class);

    private final GameService gameService;
    private final MemberRepository memberRepository;
    private final DeckRepository deckRepository;
    public MemberResponseDto findMemberInfoById(Long memberId)
    {
        Optional<Member> optional = memberRepository.findById(memberId);
        if(optional.isEmpty()) {
            throw new RuntimeException("로그인 유저 정보가 없습니다.");
        }
        MemberResponseDto member = MemberResponseDto.of(optional.get());
        member.setDeck(gameService.getUserDeck(memberId));
        return member;
    }
    public MemberResponseDto findMemberInfoByEmail(String email)
    {
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(()->new RuntimeException("유저 정보가 없습니다."));
    }

    public List<DeckEntity> getUserDeck(Long memberId) {
        List<DeckEntity> deck = deckRepository.findByMemberId(memberId);
        if(deck.isEmpty()) {
            throw new RuntimeException("덱 정보가 없습니다.");
        }
        return deck;
    }

    public GameCharacterEntity setMyCharacter(Long characterId) {
        GameCharacterEntity gameCharacterEntity=gameService.getCharacter(characterId); //캐릭터ID에 대응하는 개체 (ex. 곽춘배)
        MemberResponseDto memberResponseDto = findMemberInfoById(SecurityUtil.getCurrentMemberId()); //멤버ID에 대응하는 맴버 response 개체(ex. 이재완)
        Optional<Member> member=memberRepository.findByEmail(memberResponseDto.getEmail()); //멤버response 개체의 이메일로, 멤버레포의 멤버 접근
        member.get().changeGameCharacter(gameCharacterEntity); //이재완의 gamecharacter = 곽춘배
        memberRepository.save(member.get());
        return gameCharacterEntity; //곽춘배 반환
    }
}